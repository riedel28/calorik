# radio-group

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim modulo mechanical renames). Restructured: group and items now come from two subpaths. Clean; tests pass (39/39).

## Changed

- `src/components/ui/radio-group.tsx` — `@radix-ui/react-radio-group` `Root`/`Item`/`Indicator` → callable `RadioGroupPrimitive` from `@base-ui/react/radio-group` plus `Radio.Root`/`Radio.Indicator` from `@base-ui/react/radio`. Item class rewrite: `disabled:cursor-not-allowed disabled:opacity-50` → `data-disabled:*` (rendered element changes `<button>` → `<span>`, so the pseudo-class is dead). `focus-visible:*` kept — the Base UI root span is focusable. Inner presentational span and Indicator classes unchanged. `displayName`s switched to string literals (Base UI parts don't expose `displayName`).
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/radio-group.tsx` → no matches.

## Left alone

- `src/app/[locale]/components/user-inputs/user-inputs.tsx` — no call-site changes needed: `onValueChange={field.onChange}` stays type-safe (Base UI adds a second `eventDetails` arg, RHF's handler ignores it), and `id`/`htmlFor` label association keeps working because Base UI places the user-supplied `id` on the hidden `<input>` in non-native-button mode (verified in `node_modules/@base-ui/react/radio/root/RadioRoot.mjs`).

## Behavior changes

- Item element changes `<button role="radio">` → `<span role="radio">` + hidden `<input>`; form posts now flow through the native input.
- Radix `orientation`/`loop`/`dir` group props are gone in Base UI (arrow-key navigation handles both axes automatically) — none were used here.

## Verify by hand

- In the projection form, click the gender and formula radio labels: selection follows the label click.
- Arrow keys move selection within a group; Tab enters/leaves the group.
- Selected item shows the filled dot; `data-testid="gender-male"` still resolves for tests.
