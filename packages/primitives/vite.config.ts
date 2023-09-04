import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: (id) => !id.startsWith('.') && !id.startsWith('/'),
      output: {
        dir: 'dist',
      },
    },
  },
  plugins: [dts(), react()],
});
