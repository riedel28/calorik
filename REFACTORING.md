# Refactoring

- Update all dependencies to their latest versions
- Replace Mantine with Tailwind and ShadCN
  - Install all dependencies needed
  - Use ShadCN components instead of Mantine ones. Use Field components for form elements especially
  - For the language switcher in header use dropdown menu. Use some flag library to display flag icons
  - Run tests to ensure everything is working
- Clean up unused dependencies
  - `knip` find unused code paths
- Move to Biome for formatting and linting
  - Add corresponding npm scripts for that
  - Remove ESLint and Prettier
