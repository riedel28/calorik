# switch

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim modulo mechanical data-attribute renames). Direct 1:1 Root/Thumb mapping. Clean.

## Changed

- `src/components/ui/switch.tsx` — `@radix-ui/react-switch` `Root`/`Thumb` → `SwitchPrimitive.Root`/`SwitchPrimitive.Thumb` from `@base-ui/react/switch`; props type → `SwitchPrimitive.Root.Props`. Class rewrites per the mapping: `data-[state=checked]:` → `data-checked:`, `data-[state=unchecked]:` → `data-unchecked:`, and — because the rendered element changes `<button>` → `<span>` — `disabled:cursor-not-allowed disabled:opacity-50` → `data-disabled:*` (the pseudo-class is dead on a span). `focus-visible:*` kept: the Base UI root span is itself focusable (same idiom as the official base registry switch).
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/switch.tsx` → no matches.

## Left alone

- No consumers import `Switch` anywhere in `src/` (verified by grep) — the wrapper is currently unused. Migrated anyway since it is an installed ui component.

## Behavior changes

- Rendered element changes `<button role="switch">` → `<span>` with a hidden `<input>`; form submission now goes through the native input (name/value submit "on" by default, matching native checkbox semantics).
- `onCheckedChange` gains a second `eventDetails` argument (no consumers affected).

## Verify by hand

- No usage in the app today; if added later: toggle with click and Space/Enter, confirm thumb translate and checked color, and focus ring visibility via keyboard.
