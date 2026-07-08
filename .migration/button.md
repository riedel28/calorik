# button

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim), migrated to the real `@base-ui/react/button` primitive. Clean.

## Changed

- `src/components/ui/button.tsx` — `@radix-ui/react-slot` Slot/`asChild` idiom replaced by `ButtonPrimitive` from `@base-ui/react/button`, which supports `render` natively. `asChild` prop removed from `ButtonProps` (no consumer used it); props now extend `ButtonPrimitive.Props`, so `render` is available at call sites. `buttonVariants` cva classes unchanged. `forwardRef` target widened `HTMLButtonElement` → `HTMLElement` to match the primitive.
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/button.tsx` → no matches.

## Left alone

- All consumers (`language-switcher.tsx`, `goal-setting.tsx`, `theme-toggle.tsx`, `calendar.tsx`) — none passed `asChild` to `Button`; no call-site changes needed. `calendar.tsx` only imports `buttonVariants`, which is unchanged.
- `disabled:*` Tailwind variants kept: Base UI Button still renders a native `<button>`, so they remain live.

## Behavior changes

None. Base UI Button adds `focusableWhenDisabled` (unused, default false); rendering and semantics are identical for plain-button usage.

## Verify by hand

- Click the theme toggle and language-switcher trigger buttons: hover/focus ring styles and disabled opacity unchanged.
- Tab through the form: buttons receive focus ring (`focus-visible:ring-1`).
