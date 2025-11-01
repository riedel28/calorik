import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
  ],
  test: {
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
    exclude: ['**/node_modules/**'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});