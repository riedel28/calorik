import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'happy-dom',
    setupFiles: './setupTests.ts',
  },
});
