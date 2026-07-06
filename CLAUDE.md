# CLAUDE.md

Guidance for Claude Code when working in this repo.

## Project

Calorik: calorie counter / daily-calorie-projection app. Next.js 16 (App Router), React 19, TypeScript. Locales: en, de, ru.

## Commands

- `npm run dev` / `npm run build` (outputs to `/build`, not `.next`) / `npm run start`
- `npm run test:no-watch` - run tests once
- `npm run check` - Biome lint + format (replaces ESLint/Prettier)

## Stack

Tailwind + ShadCN/Radix UI, React Hook Form + Zod, next-intl, Vitest.

## Structure

- `src/app/[locale]/` - routes; `components/` - page-specific components
- `src/components/ui/` - ShadCN components
- `src/context/` - form state (`UserDataProvider`)
- `src/helpers.ts` (+ `.test.ts`) - calorie formulas (Harris-Benedict, Mifflin-St-Jeor)
- `@/*` maps to `src/*`

## Notes

- Server components use `setRequestLocale()` + `generateStaticParams()` for static locale rendering
- Biome auto-formats on save/commit - don't hand-format
