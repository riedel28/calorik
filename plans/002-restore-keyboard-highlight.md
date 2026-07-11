# Plan 002: Restore visible keyboard highlight in Select and DropdownMenu items

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 13c252a..HEAD -- src/components/ui/select.tsx src/components/ui/dropdown-menu.tsx src/app/[locale]/components/header/header.test.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (001 recommended first so `npm run typecheck` exists)
- **Category**: bug (accessibility regression)
- **Planned at**: commit `13c252a`, 2026-07-08

## Why this matters

The repo recently migrated its UI kit from Radix UI to `@base-ui/react` (v1.6.0). Radix menu/select items receive real DOM focus, so shadcn's `focus:bg-accent` classes highlighted the active item. Base UI instead marks the active item with a `data-highlighted` attribute — its Select keeps DOM focus on the popup (active-descendant pattern), so `:focus` never fires on an item. Result: arrow-key navigation through the activity-level select, the goal-quality select, and the language-switcher menu shows **no visible highlight at all**, and Select items also lost their hover highlight (Base UI's `highlightItemOnHover` sets `data-highlighted`, not focus). This is a real keyboard-accessibility regression on the app's primary form.

## Current state

- `src/components/ui/select.tsx:84` — `SelectItem` class string (inside `cn(...)`):

  ```
  'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
  ```

- `src/components/ui/dropdown-menu.tsx:45` — `DropdownMenuItem` class string:

  ```
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50'
  ```

- Base UI emits the attribute as a valueless boolean: `node_modules/@base-ui/react/select/item/SelectItemDataAttributes.d.ts` → `highlighted = "data-highlighted"` (also `selected = "data-selected"`); same for menu items in `node_modules/@base-ui/react/menu/item/MenuItemDataAttributes.d.ts`.
- Tailwind v4 is in use; the repo already uses bare boolean data-attribute variants — e.g. `data-disabled:` in the dropdown-menu excerpt above and `data-popup-open:` in `src/app/[locale]/components/language-switcher/language-switcher.tsx:35`. Match that form (`data-highlighted:`), not the `data-[highlighted]:` form.
- Consumers affected: `src/app/[locale]/components/user-inputs/user-inputs.tsx:296` (activity select), `src/app/[locale]/components/goal-setting/goal-setting.tsx:228` (goal-quality select), `src/app/[locale]/components/language-switcher/language-switcher.tsx:56` (language menu).
- Existing test exemplar: `src/app/[locale]/components/header/header.test.tsx` — renders `Header` inside `ThemeProvider` with `vi.mock('next-intl', ...)` and `vi.mock('@/i18n/navigation', ...)`, uses `userEvent` and role queries. Model the new test on it.
- Biome auto-formats; run `npm run fix` before committing, never hand-format.

## Commands you will need

| Purpose   | Command                                   | Expected on success |
|-----------|-------------------------------------------|---------------------|
| Tests     | `npm run test:no-watch`                   | all pass            |
| One file  | `npx vitest run src/app/\[locale\]/components/header/header.test.tsx` | pass |
| Lint/format | `npm run fix` then `npm run check`      | exit 0              |
| Typecheck | `npx tsc --noEmit`                        | exit 0 (only if plan 001 landed; otherwise skip — it fails on a pre-existing tsconfig deprecation) |

## Scope

**In scope** (the only files you should modify):
- `src/components/ui/select.tsx` (one class string)
- `src/components/ui/dropdown-menu.tsx` (one class string)
- `src/app/[locale]/components/header/header.test.tsx` (add one test)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- The dead `group-data-[disabled=true]` selectors in `src/components/ui/field.tsx:107,124` and `src/components/ui/label.tsx:12` — same family of bug, but unplanned scope (no disabled fields exist today); noted in the index backlog.
- `SelectValue`, `SelectTrigger`, popup animation classes — verified correct for Base UI already.
- Consumer components (`user-inputs.tsx`, `goal-setting.tsx`, `language-switcher.tsx`) — no changes needed there.

## Git workflow

- Branch: `advisor/002-keyboard-highlight`
- One commit, conventional style, e.g. `fix(ui): highlight base-ui items via data-highlighted`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add `data-highlighted` variants to `SelectItem`

In `src/components/ui/select.tsx` (line ~84), extend the class string. Keep the existing `focus:` classes as a harmless fallback, and add the boolean-attribute variants after them:

```
... outline-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none ...
```

**Verify**: `npm run check` → exit 0.

### Step 2: Add `data-highlighted` variants to `DropdownMenuItem`

Same edit in `src/components/ui/dropdown-menu.tsx` (line ~45): after `focus:bg-accent focus:text-accent-foreground`, add `data-highlighted:bg-accent data-highlighted:text-accent-foreground`.

**Verify**: `npm run check` → exit 0.

### Step 3: Add a regression test for menu-item highlighting

In `src/app/[locale]/components/header/header.test.tsx`, add a test to the existing `describe('Header')` block: open the language dropdown (click the trigger as the existing test does), press `{ArrowDown}` via `userEvent.keyboard`, and assert that some element in the open menu carries the `data-highlighted` attribute:

```tsx
test('marks the active menu item as highlighted for keyboard navigation', async () => {
  const user = userEvent.setup();
  render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Header />
    </ThemeProvider>,
  );

  await user.click(screen.getByRole('button', { name: ENGLISH_REGEX }));
  await screen.findByRole('link', { name: DEUTSCH_REGEX });
  await user.keyboard('{ArrowDown}');

  const highlighted = document.querySelector('[data-highlighted]');
  expect(highlighted).not.toBeNull();
});
```

This pins the assumption the CSS fix depends on: Base UI expresses the active item as `data-highlighted`. If a future Base UI upgrade changes that contract, this test fails before users notice unstyled navigation. Adjust the interaction (e.g. an extra `{ArrowDown}`) if the first key press only moves virtual focus into the list — the assertion is what matters.

**Verify**: `npx vitest run "src/app/[locale]/components/header/header.test.tsx"` → all tests in the file pass, including the new one.

### Step 4: Full suite + format

**Verify**: `npm run fix && npm run check && npm run test:no-watch` → exit 0, all tests pass.

## Test plan

- New test (Step 3) in `header.test.tsx`: keyboard navigation sets `data-highlighted` on a menu item. Model after the existing `shows language options in dropdown` test in the same file.
- The Select popup is portal-rendered and harder to drive in jsdom; the menu test covers the shared contract (`data-highlighted` boolean attribute). Manual check for the selects is listed below.
- Manual verification (recommended, requires `npm run dev`): open http://localhost:3000/en, Tab to the activity-level select, open it with Enter, press ArrowDown — each option must visibly highlight; same for the language menu and goal-quality select.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -c "data-highlighted:bg-accent" src/components/ui/select.tsx` → 1
- [ ] `grep -c "data-highlighted:bg-accent" src/components/ui/dropdown-menu.tsx` → 1
- [ ] `npm run test:no-watch` exits 0; the new highlight test exists and passes
- [ ] `npm run check` exits 0
- [ ] `git status` shows no modified files outside the in-scope list
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The class strings at `select.tsx:84` / `dropdown-menu.tsx:45` don't match the excerpts above.
- The new test cannot find any `[data-highlighted]` element after keyboard interaction — that would falsify this plan's core assumption about Base UI v1.6.0's menu semantics; do not ship the CSS-only change unverified.
- Tailwind does not generate the `data-highlighted:` variant (check by grepping the built CSS or observing no style in dev) — report rather than switching to arbitrary-variant syntax on your own.

## Maintenance notes

- On the next `@base-ui/react` upgrade, re-check the data-attribute contract (`SelectItemDataAttributes.d.ts`, `MenuItemDataAttributes.d.ts`); the Step 3 test is the tripwire.
- Follow-up deferred to the backlog: replace the dead `group-data-[disabled=true]` selectors in `field.tsx`/`label.tsx` with boolean `group-data-disabled` forms, and consider `data-selected:` styling for the chosen Select item.
- Reviewer focus: the diff should be two class strings and one test — nothing structural.
