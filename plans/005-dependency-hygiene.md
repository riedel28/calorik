# Plan 005: Dependency and package-manager hygiene

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- package.json vitest.config.ts src/components/theme-toggle.tsx .husky/pre-commit .gitignore`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: 001 (CI must exist so this cleanup is gated; CI also cements npm as the canonical manager)
- **Category**: tech-debt / deps
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

The manifest carries dead weight and one real ambiguity. Dead weight: `react-spring` is imported nowhere (knip-confirmed); `react-icons` exists only for two icons in the theme toggle while `lucide-react` (already a dependency, used everywhere else) has the same icons; `happy-dom` is installed alongside `jsdom` but `vitest.config.ts` uses only jsdom; `vite-tsconfig-paths` prints a deprecation warning on every single test run telling you to use Vite's native option. The ambiguity: **two lockfiles** (`package-lock.json` and `bun.lock`) are committed, and the pre-commit hook runs `bun x biome` while README/CLAUDE.md/CI use npm — two managers will eventually resolve different dependency trees. Finally, a stray Next 14 telemetry artifact (`dist/_events.json`, from 2023) is committed and `dist/` is not gitignored.

## Current state

- `package.json` (as of `13c252a`):
  - dependencies include `"react-spring": "^10.0.4"` (line 21), `"react-icons": "^5.7.0"` (line 20), `"lucide-react": "^1.23.0"` (line 10);
  - devDependencies include `"happy-dom": "^20.10.6"` (line 37), `"jsdom": "^29.1.1"` (line 39), `"vite-tsconfig-paths": "^6.1.1"` (line 46), `"shadcn": "^4.13.0"` (line 42 — **keep**, it's the component CLI used ad hoc).
- Sole `react-icons` consumer — `src/components/theme-toggle.tsx:5` and usages at lines 30–32:

  ```tsx
  import { FiMoon, FiSun } from 'react-icons/fi';
  ...
  {mounted && isDark && <FiSun className="h-5 w-5" />}
  {mounted && !isDark && <FiMoon className="h-5 w-5" />}
  {!mounted && <FiSun className="h-5 w-5" />}
  ```

  `lucide-react` is already used in `goal-setting.tsx:13` (`CalendarIcon`), `goal-results.tsx:3` (`TriangleAlert`), etc., and exports `Sun` and `Moon`.
- `vitest.config.ts` (whole file, 15 lines):

  ```ts
  import react from '@vitejs/plugin-react';
  import tsconfigPaths from 'vite-tsconfig-paths';
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: { environment: 'jsdom', exclude: ['**/node_modules/**'], globals: true,
      include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
      setupFiles: './setup-tests.ts' },
  });
  ```

  Every test run prints: *"The plugin \"vite-tsconfig-paths\" is detected. Vite now supports tsconfig paths resolution natively via the resolve.tsconfigPaths option."*
- Lockfiles: both `package-lock.json` and `bun.lock` exist at root. `.husky/pre-commit` invokes `bun x biome check --write ...`. README says `npm install`; CI (plan 001) uses `npm ci`. **Decision recorded here: npm is canonical** — it's what the docs, lockfile freshness, and CI already assume.
- `dist/_events.json` — a committed 281-byte Next.js CLI telemetry event from Next 14.0.4 / Node 21 (2023-era). `dist/` is absent from `.gitignore` (which covers `/build`, `/coverage`, `.next`).
- knip is configured (`knip.json`) and currently reports: unused dependency `react-spring`; unused devDependency `shadcn` (false positive — CLI tool; keep); unused files `src/components/ui/input.tsx`, `src/components/ui/switch.tsx` (backlog finding #8 — **not** this plan).

## Commands you will need

| Purpose   | Command                 | Expected on success |
|-----------|-------------------------|---------------------|
| Tests     | `npm run test:no-watch` | all pass, **no vite-tsconfig-paths deprecation line** |
| Lint      | `npm run check`         | exit 0              |
| Typecheck | `npm run typecheck`     | exit 0 (script exists once 001 landed) |
| Build     | `npm run build`         | exit 0              |
| Unused sweep | `npm run knip`       | no unused *dependencies* (see notes on remaining file/export findings) |

## Scope

**In scope** (the only files you should modify):
- `package.json` + `package-lock.json` (via `npm uninstall`)
- `src/components/theme-toggle.tsx` (icon import swap)
- `vitest.config.ts`
- `.husky/pre-commit` (one command substitution)
- `bun.lock` (delete)
- `dist/_events.json` (delete) and `.gitignore` (add `dist`)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `shadcn` devDependency — keep it; knip's flag is a false positive for a CLI tool.
- `src/components/ui/input.tsx`, `switch.tsx`, unused shadcn exports — backlog finding #8, separate decision.
- `.github/workflows/ci.yml` — already npm-based; no change needed.
- Upgrading any dependency version — this plan removes, it does not bump.

## Git workflow

- Branch: `advisor/005-dependency-hygiene`
- Commit per logical unit (icon swap / uninstall / vitest config / lockfile+hook / gitignore), conventional style, e.g. `chore: drop react-icons in favor of lucide-react`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Swap the theme-toggle icons to lucide-react

In `src/components/theme-toggle.tsx`: replace the import at line 5 with `import { Moon, Sun } from 'lucide-react';` and substitute `FiSun` → `Sun`, `FiMoon` → `Moon` at the three usage sites (lines 30–32). Keep the `className="h-5 w-5"` props.

**Verify**: `npm run test:no-watch` → all pass; `grep -rn "react-icons" src/` → no matches.

### Step 2: Uninstall the dead dependencies

```
npm uninstall react-spring react-icons happy-dom
```

**Verify**: `npm run test:no-watch && npm run build` → both exit 0; `grep -n "react-spring\|react-icons\|happy-dom" package.json` → no matches.

### Step 3: Replace the vite-tsconfig-paths plugin

In `vitest.config.ts`, remove the `tsconfigPaths` import and plugin call, and add an explicit alias (most robust across Vite/Vitest versions — the only alias the repo uses is `@/* → src/*`):

```ts
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: { /* unchanged */ },
});
```

Then `npm uninstall vite-tsconfig-paths`.

**Verify**: `npm run test:no-watch` → all 39+ tests pass AND the output no longer contains the string `vite-tsconfig-paths`.

### Step 4: Make npm the single package manager

1. Delete `bun.lock` (`git rm bun.lock`).
2. In `.husky/pre-commit`, change the single command `bun x biome check --write --no-errors-on-unmatched` to `npx biome check --write --no-errors-on-unmatched` (it appears once, in the `xargs -0` line). Touch nothing else in the hook.

**Verify**: `sh -n .husky/pre-commit` → exit 0 (syntax OK); `grep -c "bun" .husky/pre-commit` → 0 matches (exit 1); stage a file with a deliberate formatting slip and run `.husky/pre-commit` manually to confirm it formats via npx, then restore.

### Step 5: Remove the telemetry stray and ignore `dist`

`git rm dist/_events.json`, then add a `dist` line to `.gitignore` (next to the existing `/build` entry, as `/dist`).

**Verify**: `git ls-files dist` → empty output.

### Step 6: Final sweep

**Verify**: `npm run knip` → no "Unused dependencies" section (unused *files/exports* for `input.tsx`/`switch.tsx` and the `shadcn` devDep flag will remain — expected, they're backlog); `npm run check && npm run test:no-watch && npm run build` → exit 0.

## Test plan

No new tests — this plan removes code. The gates: full suite green after every step, build green, knip's unused-dependency list empty, deprecation warning gone from test output.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "react-spring\|react-icons\|happy-dom\|vite-tsconfig-paths" package.json` → no matches
- [ ] `npm run test:no-watch 2>&1 | grep -c "vite-tsconfig-paths"` → 0
- [ ] `ls bun.lock dist/_events.json 2>&1` → both "No such file or directory"
- [ ] `grep -c bun .husky/pre-commit` → 0
- [ ] `npm run check && npm run test:no-watch && npm run build` all exit 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any `grep` finds an additional consumer of `react-spring`, `react-icons`, or `happy-dom` not listed in "Current state".
- The alias change in Step 3 breaks test module resolution and the exact config above doesn't fix it.
- **The operator actually develops with bun** (e.g. you're told so, or `bun.lock` is newer than `package-lock.json` and CI was changed to bun) — the npm-canonical decision would then be wrong; ask instead of deleting the lockfile.
- The pre-commit hook fails its manual run after the npx substitution.

## Maintenance notes

- With bun removed, contributors must not run `bun install` (it would recreate `bun.lock`); consider a `packageManager` field or an `engines` note in a follow-up if drift recurs.
- The remaining knip findings (`input.tsx`, `switch.tsx`, unused shadcn exports) are backlog finding #8 — deliberately not addressed here.
- Reviewer focus: the theme toggle renders identically (Sun/Moon at `h-5 w-5`), and test output is warning-free.
