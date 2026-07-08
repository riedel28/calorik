# popover

2026-07-07, transformation engine (legacy `new-york` style — user's classes kept verbatim modulo mechanical renames). Content split into `Portal > Positioner > Popup`. Clean; tests pass (39/39).

## Changed

- `src/components/ui/popover.tsx` — `@radix-ui/react-popover` → `@base-ui/react/popover`. `PopoverContent` restructured to `Portal > Positioner > Popup`: `align` (default `'center'`), `alignOffset`, `side`, `sideOffset` (default `4`) are declared, destructured, and explicitly forwarded to `Positioner` (the Pick-means-FORWARD rule); Positioner gets the conventional `isolate z-50`. Class rewrites: `data-[state=open]:` → `data-open:`, `data-[state=closed]:` → `data-closed:`, `origin-[--radix-popover-content-transform-origin]` → `origin-(--transform-origin)` (Tailwind v4 var syntax; the old `[--var]` form no longer resolves in v4). The `animate-in`/`animate-out` + fade/zoom/slide utilities are kept on `data-open:`/`data-closed:` — same idiom the official base registry popover uses. All visual classes (`w-72 rounded-md border bg-popover p-4 ...`) unchanged.
- `PopoverAnchor` — Base UI has no Anchor part; replaced with an inert children-passthrough to preserve the export. See Behavior changes.
- `src/app/[locale]/components/goal-setting/goal-setting.tsx:159` — `<PopoverTrigger asChild><Button>…</Button></PopoverTrigger>` → `<PopoverTrigger render={<Button … />}>…</PopoverTrigger>` (children stay on the trigger part).
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on both files → no matches.

## Left alone

- `Calendar` inside the popover content (react-day-picker, not radix).

## Behavior changes

- **FLAGGED: `PopoverAnchor` is now inert.** It renders its children unchanged and no longer re-anchors the popover. No consumer uses it today; if anchoring is ever needed, pass `anchor` to `PopoverPrimitive.Positioner` inside the wrapper instead.
- Exit animation now relies on Base UI holding the popup mounted during close (`data-closed` + `animate-out`), which matches the registry idiom; visual result is equivalent.

## Verify by hand

- Open the goal-date picker: popover opens aligned to the start edge of the trigger button (consumer passes `align="start"`), 4px below it.
- Pick a date, press Escape, click outside: popover closes with the fade/zoom animation and focus returns to the trigger.
