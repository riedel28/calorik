import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
