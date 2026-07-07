# project

2026-07-07, whole-project migration Radix UI → Base UI (`@base-ui/react@1.6.0`). Legacy `new-york` style: transformation engine on the user's own files throughout (no registry replay — the app's look is unchanged). Final build, tests, and lint all pass, matching the pre-migration baseline.

## Dependency swap

Removed (npm, `package-lock.json` regenerated):
`@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-radio-group`, `@radix-ui/react-select` (dead — select.tsx had already been migrated to Base UI in an earlier session, before this run), `@radix-ui/react-separator`, `@radix-ui/react-slot`, `@radix-ui/react-switch`.
`@base-ui/react@^1.6.0` was already present. Zero `radix` references remain in `package.json`/`package-lock.json` and in `src/` (verified by grep).

## Components migrated this run

button, label, separator, switch, radio-group, popover, dropdown-menu, form — one commit and one `.migration/<component>.md` each. select was already on Base UI before this run (not migrated or verified by this run beyond a leftover/anatomy scan: clean, positioning props live on the exposed `SelectPositioner`).

## App-code sweep

- `goal-setting.tsx` — `PopoverTrigger asChild` → `render` (see popover.md).
- `language-switcher.tsx` — trigger/item `asChild` → `render`; `data-[state=open]:` → `data-popup-open:` on the trigger button (see dropdown-menu.md).
- `field.tsx` — `has-data-[state=checked]:*` → `has-data-checked:*` and `has-[button[role=radio]]` → `has-[[role=radio]]` (Base UI radios render `<span role="radio">`, not `<button>`); these style hooks would otherwise have gone dead.
- `onValueChange={field.onChange}` call sites (select ×2, radio-group ×2) need no change: react-hook-form's handler tolerates Base UI's added `eventDetails` argument.
- Sweep greps for `asChild`, `decorative`, `delayDuration`, `position=`, `forceMount`, `indeterminate`, `onValueCommit`, `data-[state`, `--radix` outside `components/ui/`: no remaining hits.

## Left alone (not radix)

`calendar.tsx` (react-day-picker), `card.tsx`, `input.tsx`, `input-with-suffix.tsx`, `field.tsx` (styling-only component; only the class retarget above).

## Flags (decisions for the user)

1. **components.json still reads `"style": "new-york"`** — a legacy radix style with no base counterpart (`base-new-york` does not exist). Future `npx shadcn add <component>` will deliver **radix** variants that no longer match this codebase. Either add new components by hand, or switch `components.json` to a `base-<style>` (which would restyle newly added components to that registry look). Deliberately not changed.
2. **`bun.lock` is stale** (last committed 2026-02-24; npm + `package-lock.json` are the active package manager, updated by this migration). Consider deleting `bun.lock` to avoid accidental installs from a lockfile that still lists radix.
3. Aggregated behavior deltas (details in each component file): separator is now exposed to screen readers (`role="separator"`, no `decorative`); dropdown menu focus wraps at the ends (`loopFocus` default); `PopoverAnchor` is an inert passthrough; switch/radio render `<span>` + hidden input instead of `<button>`.

## Final verification

- `npm run build` — exit 0, same route table as baseline (/, /_not-found, /[locale] en/de/ru).
- `npm run test:no-watch` — 4 files, 39/39 passed (baseline: 39/39).
- `npm run check` (biome) — 60 files, clean.
- `npx tsc --noEmit` — only the pre-existing TS5101 `baseUrl` deprecation error, present before the migration (baseline-documented, not introduced by this work).

**0 wrappers remain on Radix** (derived: `grep -rn "@radix-ui\|from 'radix-ui'" src/components/ui/` → no matches).
