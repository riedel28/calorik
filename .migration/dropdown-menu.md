# dropdown-menu

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim modulo mechanical renames). Radix DropdownMenu → Base UI Menu (renamed primitive), Content split into `Portal > Positioner > Popup`. Clean; tests pass (39/39).

## Changed

- `src/components/ui/dropdown-menu.tsx` — `@radix-ui/react-dropdown-menu` → `Menu` from `@base-ui/react/menu`. `DropdownMenu`/`DropdownMenuTrigger` re-point to `Menu.Root`/`Menu.Trigger`. `DropdownMenuContent` restructured to `Portal > Positioner > Popup` with `align`/`alignOffset`/`side`/`sideOffset` declared, destructured, and explicitly forwarded to Positioner (defaults preserve prior behavior: `sideOffset=4`, `align='center'` — the Radix and Base defaults coincide). Class rewrites: `data-[state=open]:`→`data-open:`, `data-[state=closed]:`→`data-closed:`; slide-per-side, fade/zoom, and all visual classes unchanged. `DropdownMenuItem` → `Menu.Item`; `focus:bg-accent focus:text-accent-foreground` kept (Base UI menu items receive real DOM focus — same idiom as the official base registry item); `data-disabled:*` presence classes already matched Base UI.
- `src/app/[locale]/components/language-switcher/language-switcher.tsx` — trigger `asChild` → `render={<Button … />}` with children moved onto the trigger part; Button classes `data-[state=open]:bg-accent/text-accent-foreground` → `data-popup-open:*` (Base UI trigger open marker). Item `asChild` + `<Link>` child → `render={<Link … />}` with the flag/label children on the item.
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on both files → no matches.

## Left alone

- No Group/Label/Checkbox/Radio/Sub parts existed in this slim wrapper — nothing else to map.

## Behavior changes

- `Menu.Item` `closeOnClick` defaults to `true`, matching Radix close-on-select for plain items — no delta for this app (no CheckboxItem/RadioItem, where the default flips).
- Radix `loop` (focus wrap) was not exposed; Base UI loops focus by default (`loopFocus=true`), Radix did not. Minor keyboard-nav feel change: pressing ArrowDown on the last language wraps to the first. Flagged, not patched.

## Verify by hand

- Open the language switcher: menu opens end-aligned, 4px below the trigger; trigger shows the accent background while open.
- Arrow keys + typeahead highlight items; Enter/click on a language navigates and closes the menu.
- Escape closes and returns focus to the trigger.
