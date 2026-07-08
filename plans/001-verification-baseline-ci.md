# Plan 001: Repair the typecheck baseline and add CI

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- tsconfig.json package.json .github`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

The repo currently has no CI and no working typecheck: `npx tsc --noEmit` fails with `TS5101: Option 'baseUrl' is deprecated` under the installed TypeScript 6.0.3, there is no `typecheck` npm script, and nothing runs lint/tests/build on push. Tests (39) and Biome are green today, but nothing keeps them green. Every other plan in `plans/` relies on the verification commands this plan establishes, so it must land first.

## Current state

- `tsconfig.json` — contains the deprecated `baseUrl` and a stale `include` list:

  ```jsonc
  // tsconfig.json:28-42 (as of 13c252a)
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
  },
  "include": [
    "./build/types/**/*.ts",
    "./dist/types/**/*.ts",      // stale: Next writes to build/ (next.config.mjs distDir), not dist/
    "./next-env.d.ts",
    "./src",
    ".next/types/**/*.ts",       // stale: .next is never produced (distDir is build)
    "setupTests.ts",             // stale: the real file is setup-tests.ts (hyphenated)
    "build/types/**/*.ts",       // duplicate of the first entry
    "build/dev/types/**/*.ts"
  ],
  ```

- `package.json` scripts (lines 49–64): `dev`, `build`, `start`, `test`, `test:no-watch`, `test:coverage`, `test:ui`, `lint`, `format`, `check`, `deps:unused`, `knip`, `fix`, `prepare`. There is **no `typecheck`** script.
- `next.config.mjs:12` sets `distDir: 'build'`.
- There is no `.github/` directory at all.
- The test setup file is `setup-tests.ts` (repo root), referenced by `vitest.config.ts:12` as `setupFiles: './setup-tests.ts'`.
- `package-lock.json` exists and is current (a `bun.lock` also exists; plan 005 resolves that duality — CI here uses npm, which plan 005 keeps as the canonical manager).
- Repo conventions: commit messages are conventional commits (`chore:`, `fix(ui):`, `refactor(ui):` — see `git log --oneline -5`). Biome handles formatting; never hand-format.

## Commands you will need

| Purpose   | Command                  | Expected on success |
|-----------|--------------------------|---------------------|
| Install   | `npm ci`                 | exit 0              |
| Typecheck | `npx tsc --noEmit`       | exit 0, no output   |
| Tests     | `npm run test:no-watch`  | 39+ tests pass      |
| Lint      | `npm run check`          | exit 0              |
| Build     | `npm run build`          | exit 0, output in `build/` |

## Scope

**In scope** (the only files you should modify):
- `tsconfig.json`
- `package.json` (scripts section only)
- `.github/workflows/ci.yml` (create)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `vitest.config.ts` — the `vite-tsconfig-paths` deprecation warning is handled by plan 005.
- `bun.lock` / `.husky/pre-commit` — lockfile consolidation is plan 005.
- Any file under `src/`.

## Git workflow

- Branch: `advisor/001-verification-baseline`
- Conventional commits, e.g. `chore: fix tsconfig for TS6 and add typecheck script`, `ci: add GitHub Actions workflow`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Remove `baseUrl` and clean the `include` list

In `tsconfig.json`:

1. Delete the `"baseUrl": "."` line. Change `paths` to use an explicitly relative pattern (required when `baseUrl` is absent):

   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

2. Replace the `include` array with:

   ```json
   "include": [
     "./next-env.d.ts",
     "./src",
     "./setup-tests.ts",
     "./build/types/**/*.ts",
     "./build/dev/types/**/*.ts"
   ]
   ```

**Verify**: `npx tsc --noEmit` → exit 0, no output (the TS5101 error is gone).
**Verify**: `npm run test:no-watch` → all tests still pass (path alias `@/*` still resolves).

### Step 2: Add a `typecheck` script

In `package.json` scripts, add:

```json
"typecheck": "tsc --noEmit",
```

**Verify**: `npm run typecheck` → exit 0.

### Step 3: Confirm the production build still resolves the alias

**Verify**: `npm run build` → exit 0. (Next.js reads `paths` from tsconfig; this confirms removing `baseUrl` didn't break it.)

### Step 4: Add the CI workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [master]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run typecheck
      - run: npm run test:no-watch
      - run: npm run build
```

Note the default branch is `master` (not `main`).

**Verify**: `npx --yes yaml-lint .github/workflows/ci.yml` if available; otherwise `node -e "require('node:fs').readFileSync('.github/workflows/ci.yml','utf8')" && python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/ci.yml'))"` → exit 0.

### Step 5: Run the full local equivalent of CI

**Verify**: `npm run check && npm run typecheck && npm run test:no-watch && npm run build` → exit 0 overall.

## Test plan

No new tests — this plan creates the gates other plans' tests run through. The verification steps above are the test.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run typecheck` exits 0
- [ ] `grep -c baseUrl tsconfig.json` returns 0 matches (exit 1)
- [ ] `grep -c "setupTests.ts\|dist/types\|.next/types" tsconfig.json` returns 0 matches (exit 1)
- [ ] `npm run test:no-watch` exits 0 (39+ tests)
- [ ] `npm run build` exits 0
- [ ] `.github/workflows/ci.yml` exists and parses as YAML
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Removing `baseUrl` breaks `@/*` resolution in `tsc`, `vitest`, or `next build` and the relative-`paths` form in Step 1 does not fix it.
- `npx tsc --noEmit` reports errors **other than** TS5101 before your changes (the baseline is dirtier than this plan assumes).
- `npm run build` fails for reasons unrelated to tsconfig (e.g. network/font fetch) — report, don't work around.

## Maintenance notes

- Plan 005 (dependency hygiene) decides the canonical package manager; if it were ever changed to bun, this workflow's `npm ci`/cache lines must change with it.
- Reviewers should check that no `ignoreDeprecations` compiler flag was introduced — the point is to remove `baseUrl`, not silence the warning.
- Deferred: coverage reporting in CI (`npm run test:coverage` exists) — add later if wanted.
