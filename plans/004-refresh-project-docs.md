# Plan 004: Bring CLAUDE.md and README back in line with the actual codebase

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- CLAUDE.md README.md REFACTORING.md package.json src`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 001 (docs will reference the `typecheck` script it adds; if 001 hasn't landed, omit that line)
- **Category**: docs
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

Both instruction files are actively wrong — worse than missing. `CLAUDE.md` (loaded into every AI-agent session on this repo) points agents at files and libraries that no longer exist: `src/context/` with a `UserDataProvider`, `src/helpers.ts` with a "Harris-Benedict" formula, and "ShadCN/Radix UI" — all removed during the recent rewrites (commits `c1f2874` dropped the context, `e9a2cb9` removed legacy helpers, `13c252a` removed Radix). `README.md` still credits Mantine, which was replaced by Tailwind + Base UI. Every future agent session starts by chasing ghosts. `REFACTORING.md` is a completed checklist with no remaining value.

## Current state

- `CLAUDE.md` (repo root) — the stale claims, verbatim:
  - Stack section: `Tailwind + ShadCN/Radix UI, React Hook Form + Zod, next-intl, Vitest.` — Radix was fully removed in `13c252a`; the UI kit is `@base-ui/react` v1.6 with shadcn-style local components.
  - Structure section lists: `src/context/ - form state (UserDataProvider)` — **no `src/context/` exists**; and `src/helpers.ts (+ .test.ts) - calorie formulas (Harris-Benedict, Mifflin-St-Jeor)` — **no `src/helpers.ts` exists**; the calculation module is `src/lib/calculations.ts` (+ `calculations.test.ts`) implementing Mifflin-St Jeor, Katch-McArdle, and a Deurenberg body-fat estimate. Harris-Benedict does not exist in the code (plan 006 is a spike to add it).
- The actual `src/` layout (as of `13c252a`):
  - `src/app/[locale]/` — routes; `components/` beneath it holds page components: `current-stats/`, `goal-results/`, `goal-setting/`, `header/`, `language-switcher/`, `projection-form/` (form + `schema.ts` + `form-storage.ts` + `use-projection.ts`), `user-inputs/`.
  - `src/components/ui/` — shadcn-style components on `@base-ui/react`; `src/components/providers/theme-provider.tsx`; `src/components/theme-toggle.tsx`.
  - `src/lib/calculations.ts` — pure calorie/body-composition math; `src/lib/utils.ts` — `cn()`.
  - `src/i18n/` — next-intl `routing.ts`, `request.ts`, `navigation.ts`. Locales: en, de, ru (`messages/*.json`).
  - Form state lives in React Hook Form via `FormProvider` (`projection-form.tsx`), persisted to localStorage (`form-storage.ts`). There is no context directory.
- `README.md` — lists Mantine with a logo (line 12: `...Mantine`), an outdated screenshot (2022, line 6), demo link `https://calorik-riedel28.vercel.app/en`, and a Setup section ending at `npm install` with no run command.
- `REFACTORING.md` — a 13-line checklist (deps update, Mantine→Tailwind/ShadCN, knip, Biome migration); every item is verifiably done in the current tree.
- `package.json` scripts that docs should reference: `dev`, `build` (outputs to `build/`, not `.next`), `start`, `test:no-watch`, `test:coverage`, `check`, `fix`, `knip`, plus `typecheck` if plan 001 landed.
- Note: `.claude/CLAUDE.md` (code standards) is separate, accurate, and **out of scope**.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Confirm claims before writing | `ls src/context src/helpers.ts 2>&1` | "No such file or directory" for both |
| Lint (markdown is not linted, but run anyway) | `npm run check` | exit 0 |
| Stale-reference sweep | `grep -rn "Mantine\|helpers.ts\|UserDataProvider\|src/context" CLAUDE.md README.md` | no matches after the edit |

## Scope

**In scope** (the only files you should modify):
- `CLAUDE.md`
- `README.md`
- `REFACTORING.md` (delete)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `.claude/CLAUDE.md` — the Biome/code-standards doc is accurate as-is.
- Any source file. This plan changes documentation only.
- The README screenshot image is hosted externally; you cannot regenerate it — remove the stale image line rather than replacing it.

## Git workflow

- Branch: `advisor/004-refresh-docs`
- One commit, conventional style, e.g. `docs: update CLAUDE.md and README to the post-rewrite codebase`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Rewrite the stale sections of `CLAUDE.md`

Keep the file's existing structure and terse tone (Project / Commands / Stack / Structure / Notes). Required corrections:

- Stack: `Tailwind v4 + Base UI (@base-ui/react) with shadcn-style components in src/components/ui/, React Hook Form + Zod, next-intl, Vitest, Biome.`
- Structure: replace the `src/context/` and `src/helpers.ts` bullets with the real layout from "Current state" above — at minimum: `src/lib/calculations.ts` (+ `.test.ts`) — calorie formulas (Mifflin-St Jeor, Katch-McArdle, Deurenberg body-fat estimate); `src/app/[locale]/components/projection-form/` — form schema, localStorage persistence (`form-storage.ts`), live projection hook (`use-projection.ts`).
- Commands: keep the existing ones (they are correct), add `npm run typecheck` if the script exists in `package.json` at execution time.
- Keep the Notes section (`setRequestLocale()`, Biome auto-format) — both still true.

**Verify**: `grep -n "helpers.ts\|UserDataProvider\|src/context\|Radix\|Harris" CLAUDE.md` → no matches.

### Step 2: Update `README.md`

- Replace the "powered by" list: React, Next.js, Tailwind CSS, Base UI, React Hook Form (drop Mantine; you may keep the icon-image style or switch to a plain list — plain list preferred, the icon URLs are third-party hotlinks).
- Remove the stale screenshot line (`![Screenshot](https://abload.de/img/...)`).
- Extend Setup with run/test commands: `npm run dev`, `npm run test:no-watch`, `npm run check`.
- Keep the demo link and the one-line description; mention the three locales (en/de/ru).

**Verify**: `grep -in "mantine" README.md` → no matches.

### Step 3: Delete `REFACTORING.md`

First confirm every checklist item is done (they are, as of `13c252a`: Biome present in `package.json`, no eslint/prettier configs in root, no Mantine imports — check with `grep -rn "mantine" src package.json` → no matches). Then `git rm REFACTORING.md`.

**Verify**: `ls REFACTORING.md` → No such file or directory.

### Step 4: Sweep and commit

**Verify**: `grep -rn "Mantine\|helpers.ts\|UserDataProvider\|src/context" CLAUDE.md README.md` → exit 1 (no matches), and `npm run check` → exit 0.

## Test plan

No code changes — the greps in each step are the tests. Additionally sanity-check that every path named in the new CLAUDE.md exists: `ls src/lib/calculations.ts "src/app/[locale]/components/projection-form/form-storage.ts" src/components/ui` → all exist.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -rn "Mantine\|helpers.ts\|UserDataProvider\|src/context\|Radix" CLAUDE.md README.md` returns no matches
- [ ] Every file path mentioned in CLAUDE.md exists on disk (`ls` each)
- [ ] `REFACTORING.md` is deleted
- [ ] `npm run check` exits 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `src/context/` or `src/helpers.ts` actually exist at execution time (the codebase drifted back — the premise is wrong).
- A REFACTORING.md checklist item turns out **not** done (e.g. Mantine imports still present) — deleting the file would erase a live TODO.
- You feel the need to restructure CLAUDE.md beyond the listed corrections — keep the diff minimal; wholesale rewrites need the operator.

## Maintenance notes

- CLAUDE.md must be updated whenever `src/` layout or the command set changes — it is agent-facing configuration, not prose. Plan 006 (Harris-Benedict spike), if built, re-touches the formulas line here.
- Reviewer focus: no invented claims — everything stated in the new docs must be verifiable in the tree at review time.
