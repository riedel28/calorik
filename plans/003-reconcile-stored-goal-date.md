# Plan 003: Reconcile stale goal dates when restoring the form from localStorage

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- "src/app/[locale]/components/projection-form"`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (001 recommended first for the typecheck gate)
- **Category**: bug
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

The form persists all values to localStorage and restores them on mount, then runs validation. The schema rejects any `goalDate` earlier than tomorrow. So every returning user who saved a goal date sees, on their next visit a day or more later, a red validation error under the date field — and a mutually inconsistent pair: `daysUntilGoal` still holds the old relative number (e.g. "30") while `goalDate` holds an absolute date that no longer is 30 days away (or is in the past). The two fields are kept in sync while typing, but nothing reconciles them on restore. The fix: on restore, treat the absolute `goalDate` as the source of truth — recompute `daysUntilGoal` from it, and clear both if the date has passed.

## Current state

- `src/app/[locale]/components/projection-form/form-storage.ts` — load/save; `loadStoredFormValues()` parses localStorage under `FORM_STORAGE_KEY = 'calorik.projectionForm.v1'` with `storedValuesSchema` (types/enums only, no range checks — deliberate, see the comment at lines 7–10) and returns `ProjectionFormValues | null`.
- `src/app/[locale]/components/projection-form/projection-form.tsx:40-46` — restore effect:

  ```tsx
  useEffect(() => {
    const stored = loadStoredFormValues();
    if (stored) {
      form.reset(stored);
      form.trigger();
    }
  }, [form]);
  ```

- `src/app/[locale]/components/projection-form/schema.ts:34-39` — the rule that makes a stale date invalid:

  ```ts
  goalDate: z
    .string()
    .refine(
      (value) => value === '' || !isBefore(parseISO(value), addDays(startOfToday(), 1)),
      'goal.goalDate.error',
    ),
  ```

- The in-app sync behavior this must stay consistent with, in `src/app/[locale]/components/goal-setting/goal-setting.tsx`:
  - typing days → `goalDate = format(addDays(startOfToday(), days), 'yyyy-MM-dd')` (lines 122–133);
  - picking a date → `daysUntilGoal = String(differenceInCalendarDays(date, startOfToday()))` (lines 184–191).
  - Dates are stored as `'yyyy-MM-dd'` strings; days as integer strings. `LIMITS.daysUntilGoal = { max: 3650, min: 1 }` (from `src/lib/calculations.ts:31-39`).
- `date-fns` v4 is already a dependency; the codebase uses `parseISO`, `isBefore`, `addDays`, `startOfToday`, `differenceInCalendarDays`, `format` (see imports in `goal-setting.tsx:3-11` and `schema.ts:1`).
- Test exemplar: `src/app/[locale]/components/projection-form/form-storage.test.ts` — plain vitest unit tests around `loadStoredFormValues`/`saveFormValues` using a stubbed `window.localStorage`. Match its style.
- Convention: pure logic lives in plain exported functions so it's testable without React (see `deriveProjection` in `use-projection.ts`). Follow that: the reconciliation must be a pure function taking `today` as a parameter.

## Commands you will need

| Purpose   | Command                                                        | Expected on success |
|-----------|----------------------------------------------------------------|---------------------|
| Tests     | `npm run test:no-watch`                                        | all pass            |
| One file  | `npx vitest run "src/app/[locale]/components/projection-form/form-storage.test.ts"` | pass |
| Lint      | `npm run fix` then `npm run check`                             | exit 0              |
| Typecheck | `npx tsc --noEmit`                                             | exit 0 (only if plan 001 landed) |

## Scope

**In scope** (the only files you should modify):
- `src/app/[locale]/components/projection-form/form-storage.ts`
- `src/app/[locale]/components/projection-form/form-storage.test.ts`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `schema.ts` — the "no past dates" rule is correct for user input; do not weaken it.
- `goal-setting.tsx` — the live two-way sync is correct; this plan only fixes restore.
- `projection-form.tsx` — the restore effect stays as-is; reconciliation happens inside `loadStoredFormValues`.
- The storage key/version (`calorik.projectionForm.v1`) — the stored shape is unchanged, so no version bump.

## Git workflow

- Branch: `advisor/003-reconcile-stored-goal-date`
- One commit, conventional style, e.g. `fix: reconcile stored goal date with today on restore`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add a pure reconciliation function

In `form-storage.ts`, add and export:

```ts
// The goal date is an absolute point in time, so it wins over the stored
// relative day count: days-until-goal is recomputed against today, and an
// expired date clears both fields instead of restoring as a validation error.
export const reconcileGoalTimeline = (
  values: ProjectionFormValues,
  today: Date,
): ProjectionFormValues => { ... };
```

Behavior (exactly this):

1. `goalDate === ''` → return `values` unchanged (a bare `daysUntilGoal` means "N days from now" and stays valid).
2. `goalDate` parses (`parseISO`) to a date **on or after** `addDays(today, 1)` → return `{ ...values, daysUntilGoal: String(differenceInCalendarDays(parseISO(values.goalDate), today)) }`.
3. Otherwise (date is today, past, or unparseable → `isNaN(date.getTime())`) → return `{ ...values, daysUntilGoal: '', goalDate: '' }`.

Use `date-fns` (`parseISO`, `addDays`, `isBefore`, `differenceInCalendarDays`) to mirror the semantics in `goal-setting.tsx` and `schema.ts` quoted above. Note the boundary: `schema.ts` treats *tomorrow* as the earliest valid date, so a stored date equal to `today` must clear, and a date equal to tomorrow must yield `daysUntilGoal === '1'`.

**Verify**: `npx tsc --noEmit` exits 0 if plan 001 landed; otherwise `npm run test:no-watch` still compiles and passes.

### Step 2: Apply it in `loadStoredFormValues`

Change the success return of `loadStoredFormValues` from `result.data` to `reconcileGoalTimeline(result.data, startOfToday())` (import `startOfToday` from `date-fns`). Everything else in the function stays identical.

**Verify**: `npx vitest run "src/app/[locale]/components/projection-form/form-storage.test.ts"` → existing tests pass (if an existing test stored a fixed future/past `goalDate` and now fails, update that test's expectation to the reconciled value — that is this plan's intended behavior change; note it in the commit message).

### Step 3: Add unit tests

In `form-storage.test.ts`, add a `describe('reconcileGoalTimeline')` block testing the pure function with a **fixed** `today` (e.g. `parseISO('2026-07-08')`) — no fake timers needed:

1. empty `goalDate` → returned object equals input (and `daysUntilGoal` untouched).
2. `goalDate` = today+30 → `daysUntilGoal` becomes `'30'`, `goalDate` unchanged.
3. `goalDate` = tomorrow → `daysUntilGoal` becomes `'1'`.
4. `goalDate` = today → both cleared to `''`.
5. `goalDate` = past date → both cleared.
6. `goalDate` = garbage string (e.g. `'not-a-date'`) → both cleared.
7. Integration through storage: seed localStorage with a snapshot whose `goalDate` is in the past and `daysUntilGoal: '30'`, call `loadStoredFormValues()`, expect both fields `''` and all other fields intact. (Follow the localStorage seeding pattern already used in this test file.)

**Verify**: `npx vitest run "src/app/[locale]/components/projection-form/form-storage.test.ts"` → all pass, including 7 new tests.

### Step 4: Full suite + format

**Verify**: `npm run fix && npm run check && npm run test:no-watch` → exit 0, all tests pass.

## Test plan

Covered in Step 3. Structural pattern: the existing `form-storage.test.ts`. The key regression case is #7 (restore of an expired snapshot no longer produces a schema-invalid form state).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -c "reconcileGoalTimeline" "src/app/[locale]/components/projection-form/form-storage.ts"` ≥ 2 (definition + use in load)
- [ ] `npm run test:no-watch` exits 0, with the new `reconcileGoalTimeline` tests present
- [ ] `npm run check` exits 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The restore effect in `projection-form.tsx` or the `goalDate` refine in `schema.ts` no longer matches the excerpts above.
- You find you need to modify `projection-form.tsx` or `schema.ts` to make the behavior work — that means the design assumption (reconcile inside `loadStoredFormValues`) is wrong for the current code.
- `differenceInCalendarDays` semantics produce an off-by-one against the schema boundary that you cannot resolve with the today/tomorrow test cases as specified (cases 3 and 4 disagreeing with `schema.ts`) — the boundary contract needs a human decision.

## Maintenance notes

- If the stored shape ever changes (new fields, unit toggle, etc.), bump `FORM_STORAGE_KEY` to `.v2` — `storedValuesSchema` requires every key, so old snapshots would otherwise be dropped wholesale; reconciliation logic should move into whatever migration layer appears.
- Reviewer focus: the today/tomorrow boundary (cases 3–4) — it must match `schema.ts`'s `addDays(startOfToday(), 1)` cutoff exactly.
- Deferred (backlog finding #10): an integration test driving the real form through restore → edit → results; this plan's unit tests cover the storage layer only.
