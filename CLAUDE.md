# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Calorik is a calorie counter web application that calculates daily caloric needs based on user input and fitness goals. Supports three languages (English, German, Russian) with a dark mode-aware UI.

## Commands

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `/build`)
- `npm run start` - Start production server

### Testing

- `npm run test` - Run tests in watch mode (Vitest)
- `npm run test:no-watch` - Run tests once (CI mode)
- `npm run test:coverage` - Generate coverage report

### Code Quality

- `npm run lint` - Run Biome linter with auto-fix
- `npm run format` - Format code with Biome
- `npm run check` - Run full Biome check (lint + format)
- `npm run deps:unused` - Find unused dependencies with Knip

## Architecture

### Stack

- **Framework:** Next.js 16 with App Router (React 19, TypeScript)
- **Styling:** Tailwind CSS with ShadCN UI components (Radix primitives)
- **Forms:** React Hook Form + Zod validation
- **i18n:** next-intl with locale-prefixed routes (`/en`, `/de`, `/ru`)
- **Testing:** Vitest + React Testing Library
- **Linting:** Biome (replaces ESLint/Prettier)

### Key Directories

- `src/app/[locale]/` - Next.js App Router pages with dynamic locale segment
- `src/app/[locale]/components/` - Page-specific components (header, form, result)
- `src/components/ui/` - ShadCN UI components
- `src/context/` - React Context for form state (`UserDataProvider`)
- `src/i18n/` - Internationalization config (routing, navigation)
- `messages/` - Translation JSON files per locale

### Core Logic

- `src/helpers.ts` - Calorie calculation formulas (Harris-Benedict, Mifflin-St-Jeor)
- `src/helpers.test.ts` - Unit tests for calculation functions

### Patterns

- Server components use `setRequestLocale()` for static rendering with `generateStaticParams()`
- Client components marked with `'use client'` directive
- `cn()` utility in `src/lib/utils.ts` for Tailwind class merging
- Path alias: `@/*` maps to `src/*`

## Code Style

- Single quotes for JS/TS, double quotes for JSX attributes
- 2-space indentation, 100 char line width
- Biome handles both formatting and linting
