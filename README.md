# Calorik

_Calorie calculator and daily-calorie projection app._

Enter your body data and a goal weight — Calorik calculates your BMR and TDEE, projects your body composition at the goal, and tells you how many calories to eat per day to get there. Available in English, German, and Russian.

## Features

- **BMR formulas**: Mifflin-St Jeor, Katch-McArdle (lean-mass based), and revised Harris-Benedict (1984)
- **Body-fat estimate** via Deurenberg when you don't know your percentage
- **Goal projection**: daily calorie target, projected body fat % and lean mass at goal weight, with a warning when the pace drops below your BMR
- **Live results** — everything recalculates as you type; the form is persisted to localStorage
- **i18n** (en / de / ru) with locale-aware number formatting, plus light/dark theme

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [next-intl](https://next-intl.dev/) for internationalization
- [Vitest](https://vitest.dev/) for tests, [Biome](https://biomejs.dev/) for linting and formatting

## Demo

You can play around with the app here: [https://calorik-riedel28.vercel.app/en](https://calorik-riedel28.vercel.app/en)

## Setup

```
git clone https://github.com/riedel28/calorik.git
cd calorik
npm install
npm run dev
```

## Commands

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `npm run dev`           | Start the dev server               |
| `npm run build`         | Production build (outputs to `/build`) |
| `npm run test:no-watch` | Run tests once                     |
| `npm run typecheck`     | TypeScript check, no emit          |
| `npm run check`         | Biome lint + format check          |
| `npm run fix`           | Auto-fix lint and formatting       |
