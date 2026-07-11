# separator

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim). Direct mapping to the callable `@base-ui/react/separator` primitive. Clean.

## Changed

- `src/components/ui/separator.tsx` — `@radix-ui/react-separator` `Root` → callable `SeparatorPrimitive`. `decorative` prop dropped (no Base UI equivalent; no consumer passed it — verified by grep). `orientation` kept, default `'horizontal'`. Classes unchanged; verified Base UI still emits `data-orientation`, so the `data-[orientation=...]:` variants remain live (`node_modules/@base-ui/react/separator/SeparatorDataAttributes.mjs`).
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/separator.tsx` → no matches.

## Left alone

- `src/components/ui/field.tsx` (`FieldSeparator`, field.tsx:165) — uses the public `Separator` name with only `className`; no call-site change.

## Behavior changes

- A11y delta: the Radix wrapper defaulted `decorative={true}`, rendering `role="none"` (hidden from screen readers). Base UI Separator always renders `role="separator"` + `aria-orientation`, so separators are now exposed to assistive tech. Flagged, not patched.

## Verify by hand

- Look at the "or" divider rendered by `FieldSeparator`: the horizontal rule still spans and aligns mid-line.
