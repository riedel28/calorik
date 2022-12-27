import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '@components': `${__dirname}/src/components`,
      '@hooks': `${__dirname}/src/hooks`,
      '@context': `${__dirname}/src/context`,
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'src/setupTests.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/setupTests.js'],
    },
  },
});
