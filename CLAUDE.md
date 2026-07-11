# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Calorik: calorie counter / daily-calorie-projection app. Next.js 16 (App Router), React 19, TypeScript. Locales: en, de, ru.

## Commands

- `npm run dev` / `npm run build` (outputs to `/build`, not `.next`) / `npm run start`
- `npm run test:no-watch` - run tests once
- `npm run check` - Biome lint + format (replaces ESLint/Prettier)
- `npm run typecheck` - TypeScript, no emit

## Stack

Tailwind v4 + Base UI (@base-ui/react) with shadcn-style components in src/components/ui/, React Hook Form + Zod, next-intl, Vitest, Biome.

## Structure

- `src/app/[locale]/` - routes; `components/` - page-specific components
- `src/components/ui/` - shadcn-style components built on `@base-ui/react`
- `src/lib/calculations.ts` (+ `.test.ts`) - calorie formulas (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict, Deurenberg body-fat estimate)
- `src/app/[locale]/components/projection-form/` - form schema, localStorage persistence (`form-storage.ts`), live projection hook (`use-projection.ts`)
- `@/*` maps to `src/*`

## Notes

- Server components use `setRequestLocale()` + `generateStaticParams()` for static locale rendering
- Biome auto-formats on save/commit - don't hand-format
