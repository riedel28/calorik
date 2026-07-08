# Plan 006: Add the (revised) Harris-Benedict BMR formula as a third option

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- src/lib/calculations.ts "src/app/[locale]/components/projection-form" "src/app/[locale]/components/user-inputs" messages`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 001 (verification gates). If plan 004 already landed, also update CLAUDE.md's formulas line (see Step 7).
- **Category**: direction (feature)
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

This is a direction finding, not a bug. Grounding: the repo's own CLAUDE.md *claims* the app has a Harris-Benedict formula ("calorie formulas (Harris-Benedict, Mifflin-St-Jeor)") but the code implements only Mifflin-St Jeor and Katch-McArdle — stated-but-undelivered intent. Harris-Benedict is the best-known BMR formula and users comparing calculators expect it. The architecture makes it disproportionately cheap: one pure function in `src/lib/calculations.ts`, one enum member, one entry in an options array, six message strings.

**Design decision (made here so the executor doesn't have to):** implement the **revised Harris-Benedict equation (Roza & Shizgal, 1984)** — the variant modern calculators use — not the original 1919 coefficients. Coefficients (weight in kg, height in cm, age in years):

- male: `BMR = 88.362 + 13.397·weight + 4.799·height − 5.677·age`
- female: `BMR = 447.593 + 9.247·weight + 3.098·height − 4.330·age`

## Current state

- `src/lib/calculations.ts:48-53` — the existing formula pattern to copy:

  ```ts
  export const mifflinStJeorBMR = ({ age, gender, heightCm, weightKg }: BodyMetrics): number => {
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return gender === 'male' ? base + 5 : base - 161;
  };

  export const katchMcArdleBMR = (leanMassKg: number): number => 370 + 21.6 * leanMassKg;
  ```

  `BodyMetrics` (lines 41–46) is `{ age, gender, heightCm, weightKg }` with `Gender = 'male' | 'female'`.

- `src/app/[locale]/components/projection-form/schema.ts:32` — the enum to extend:

  ```ts
  formula: z.enum(['katch-mcardle', 'mifflin-st-jeor']),
  ```

- `src/app/[locale]/components/projection-form/use-projection.ts:75-80` — the BMR dispatch to extend:

  ```ts
  let bmr: number | null = null;
  if (values.formula === 'katch-mcardle') {
    bmr = leanMassKg !== null ? katchMcArdleBMR(leanMassKg) : null;
  } else if (values.formula === 'mifflin-st-jeor') {
    bmr = metrics ? mifflinStJeorBMR(metrics) : null;
  }
  ```

- `src/app/[locale]/components/user-inputs/user-inputs.tsx:70-81` — the radio options array to extend (rendered at lines 363–404 as a 2-column radio grid):

  ```ts
  const formulaOptions = [
    { description: t('formula.katchMcArdleDescription'), label: t('formula.katchMcArdle'), value: 'katch-mcardle' },
    { description: t('formula.mifflinStJeorDescription'), label: t('formula.mifflinStJeor'), value: 'mifflin-st-jeor' },
  ];
  ```

- `messages/{en,de,ru}.json` — each has a `formula` object with `title`, `placeholder`, `katchMcArdle`, `katchMcArdleDescription`, `mifflinStJeor`, `mifflinStJeorDescription` (en/ru also have an unused `error` key — leave it alone; it's backlog finding #6).
- Storage compatibility: `src/app/[locale]/components/projection-form/form-storage.ts:17` reuses `projectionFormSchema.shape.formula` for validating stored snapshots. Widening the enum keeps every existing snapshot valid — **no storage version bump needed**.
- Tests to model after: `src/lib/calculations.test.ts` (pure-function tests) and `src/app/[locale]/components/projection-form/use-projection.test.ts` (its `baseValues` fixture uses weight 90 kg, height 180 cm, age 30, male — see lines 6–19).
- Convention: `calculations.ts` keeps object keys and exported members alphabetically sorted (Biome-enforced style is in effect; run `npm run fix` before committing).

## Commands you will need

| Purpose   | Command                                       | Expected on success |
|-----------|-----------------------------------------------|---------------------|
| Tests     | `npm run test:no-watch`                       | all pass            |
| One file  | `npx vitest run src/lib/calculations.test.ts` | pass                |
| Typecheck | `npm run typecheck`                           | exit 0              |
| Lint      | `npm run fix` then `npm run check`            | exit 0              |
| i18n parity spot-check | `python3 -c "import json; [print(k, sorted(json.load(open(f'messages/{k}.json'))['formula'].keys())) for k in ['en','de','ru']]"` | `harrisBenedict` + `harrisBenedictDescription` present in all three |

## Scope

**In scope** (the only files you should modify):
- `src/lib/calculations.ts` and `src/lib/calculations.test.ts`
- `src/app/[locale]/components/projection-form/schema.ts`
- `src/app/[locale]/components/projection-form/use-projection.ts` and `use-projection.test.ts`
- `src/app/[locale]/components/user-inputs/user-inputs.tsx`
- `messages/en.json`, `messages/de.json`, `messages/ru.json`
- `CLAUDE.md` (only if plan 004 landed — one line, Step 7)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `form-storage.ts` — no change needed (see storage-compatibility note above).
- `goal-setting.tsx`, `goal-results.tsx`, `current-stats.tsx` — they consume `bmr` opaquely.
- The unused `formula.error` message keys — backlog finding #6.
- Radio layout/styling — the existing 2-column grid simply gets a third card.

## Git workflow

- Branch: `advisor/006-harris-benedict`
- One commit, conventional style, e.g. `feat: add revised Harris-Benedict BMR formula`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the pure function

In `src/lib/calculations.ts`, next to `mifflinStJeorBMR`, add (mirroring its shape and the coefficients from "Why this matters"):

```ts
// Revised Harris-Benedict equation (Roza & Shizgal, 1984).
export const harrisBenedictBMR = ({ age, gender, heightCm, weightKg }: BodyMetrics): number =>
  gender === 'male'
    ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
```

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Unit-test it

In `src/lib/calculations.test.ts`, following the file's existing describe/it style, add cases:

- male, weight 90, height 180, age 30 → `expect(...).toBeCloseTo(1987.6, 1)`
- female, weight 90, height 180, age 30 → `expect(...).toBeCloseTo(1707.56, 1)`

(Hand-check: male `88.362 + 13.397·90 + 4.799·180 − 5.677·30 = 1987.602`; female `447.593 + 9.247·90 + 3.098·180 − 4.33·30 = 1707.563`.)

**Verify**: `npx vitest run src/lib/calculations.test.ts` → all pass.

### Step 3: Extend the schema enum

In `schema.ts:32`: `formula: z.enum(['harris-benedict', 'katch-mcardle', 'mifflin-st-jeor'])` (keep alphabetical order).

**Verify**: `npm run typecheck` → exit 0 (the exhaustive spots that must now handle the new member will surface in the next steps; TypeScript won't error here because the dispatch is `if/else`, not a switch).

### Step 4: Extend the BMR dispatch

In `use-projection.ts`, add a branch to the chain quoted in "Current state":

```ts
} else if (values.formula === 'harris-benedict') {
  bmr = metrics ? harrisBenedictBMR(metrics) : null;
}
```

Import `harrisBenedictBMR` alongside the existing `calculations` imports. Add a test in `use-projection.test.ts` mirroring the existing Katch-McArdle test (`use-projection.test.ts:61-66`): `deriveProjection({ ...baseValues, formula: 'harris-benedict' })` → `expect(result.bmr).toBeCloseTo(1987.6, 1)`.

**Verify**: `npx vitest run "src/app/[locale]/components/projection-form/use-projection.test.ts"` → all pass.

### Step 5: Add the radio option

In `user-inputs.tsx`, add to `formulaOptions` (after mifflin, order in the array is display order — put Harris-Benedict last):

```ts
{
  description: t('formula.harrisBenedictDescription'),
  label: t('formula.harrisBenedict'),
  value: 'harris-benedict',
},
```

**Verify**: `npm run typecheck && npm run check` → exit 0.

### Step 6: Add the message strings (all three locales)

Into the `formula` object of each file (key order will be normalized by convention; content exactly as follows):

- `messages/en.json`: `"harrisBenedict": "Harris-Benedict"`, `"harrisBenedictDescription": "Classic formula (1984 revision), based on weight, height, and age"`
- `messages/de.json`: `"harrisBenedict": "Harris-Benedict"`, `"harrisBenedictDescription": "Klassische Formel (Revision 1984), basiert auf Gewicht, Größe und Alter"`
- `messages/ru.json`: `"harrisBenedict": "Харриса-Бенедикта"`, `"harrisBenedictDescription": "Классическая формула (редакция 1984), на основе веса, роста и возраста"`

**Verify**: the python3 parity spot-check from "Commands you will need" → both keys present in all three locales; `npm run test:no-watch` → all pass.

### Step 7: Update CLAUDE.md (conditional)

Only if plan 004 already landed and CLAUDE.md names the implemented formulas: extend that line to include Harris-Benedict. If plan 004 has not landed, skip — CLAUDE.md's stale text is 004's job.

**Verify**: `grep -n "Harris" CLAUDE.md` matches the formulas line (or step skipped).

### Step 8: Full gate

**Verify**: `npm run fix && npm run check && npm run typecheck && npm run test:no-watch && npm run build` → all exit 0.

## Test plan

- `calculations.test.ts`: two coefficient tests (Step 2) — the male/female hand-checked values above.
- `use-projection.test.ts`: dispatch test (Step 4); plus one guard: `deriveProjection({ ...baseValues, age: '', formula: 'harris-benedict' })` → `result.bmr` is `null` (formula needs full metrics, same contract as Mifflin).
- Manual (optional): `npm run dev`, select "Harris-Benedict" on `/en`, `/de`, `/ru` — BMR tile updates, labels localized.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -c "harrisBenedictBMR" src/lib/calculations.ts` ≥ 1 and `grep -c "harris-benedict" "src/app/[locale]/components/projection-form/schema.ts"` = 1
- [ ] `npm run test:no-watch` exits 0 with the 3+ new tests passing
- [ ] Both `harrisBenedict*` keys exist in all three `messages/*.json`
- [ ] `npm run typecheck`, `npm run check`, `npm run build` all exit 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The BMR dispatch in `use-projection.ts` no longer matches the quoted `if/else` chain (someone restructured formula selection).
- Widening the formula enum breaks stored-snapshot validation in a way the tests catch (contradicts the storage-compatibility analysis — the design premise is then wrong).
- You are tempted to add a fourth formula, a unit toggle, or restructure `formulaOptions` — out of scope; note it and finish.

## Maintenance notes

- The radio grid is `grid-cols-2` (`user-inputs.tsx:370`); with three options the last card sits alone in the second row — acceptable, but a reviewer may prefer `sm:grid-cols-3`. Flag it in the PR, don't decide silently.
- If a unit toggle (imperial) ever lands, all three BMR formulas take metric inputs — conversion must happen at the form boundary, not in `calculations.ts`.
- The i18n copy here was written by the advisor; a native German/Russian review of the two description strings is a nice-to-have, not a blocker.
