# form

2026-07-07, transformation engine (custom wrapper, no registry counterpart used). Only radix piece was `Slot` inside `FormControl`; migrated to `useRender` + `mergeProps`. Clean.

## Changed

- `src/components/ui/form.tsx` — `@radix-ui/react-slot` `Slot` in `FormControl` replaced with the `useRender` + `mergeProps` idiom from `@base-ui/react/use-render` / `@base-ui/react/merge-props` (`useRender.ComponentProps<'div'>`, object literal cast to `ComponentProps<'div'>` per the mergeProps excess-property pitfall). API change: the slotted element is now passed as `render={<Input … />}` instead of a single child — this is the Base UI convention. `FormLabel` already used a native `<label>`; `Form`/`FormField`/`FormItem`/`FormMessage` had no radix code and are untouched.
- Leftover scan clean: `grep -n "radix-ui\|@radix-ui"` on `src/components/ui/form.tsx` → no matches.

## Left alone

- `src/app/[locale]/components/projection-form/projection-form.tsx` — imports only `Form` (the react-hook-form `FormProvider` re-export); unaffected. No file in `src/` uses `FormControl`/`FormField`/`FormItem`/`FormLabel`/`FormMessage`, so the child→render API change has zero call sites to update.

## Behavior changes

None at runtime today (FormControl unused). For future use: `FormControl` composes via `render` prop, not a slotted child.

## Verify by hand

- Nothing to click today; the projection form renders through `Form` (FormProvider) exactly as before — submit the form once to confirm.
