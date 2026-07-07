# label

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim). Base UI has no Label primitive; migrated to a native `<label>`. Clean.

## Changed

- `src/components/ui/label.tsx` — `@radix-ui/react-label` `Root` replaced with a native `<label>` element; props type changed `ComponentProps<typeof Root>` → `ComponentProps<'label'>`. Classes and `data-slot="label"` unchanged. Added a `biome-ignore lint/a11y/noLabelWithoutControl` suppression (association is provided by consumers via `htmlFor`/children; biome cannot see through the prop spread — verified the rule fires without it).
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/label.tsx` → no matches.

## Left alone

- `src/components/ui/field.tsx` — imports `Label` by its public name; no call-site change needed (native label accepts the same `htmlFor`/`className` usage).

## Behavior changes

- Radix Label prevented text selection when double-clicking the label. Native `<label>` does not, though the existing `select-none` class covers the visual selection case. Flagged, not patched.

## Verify by hand

- Click a field label in the projection form: the associated input receives focus.
- Double-click a label: no text-selection artifacts (select-none class).
