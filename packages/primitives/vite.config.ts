import { parse, resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['cjs', 'es'],
      fileName(format) {
        return `[name].${format === 'es' ? 'js' : format}`;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external(id) {
        const { root, dir } = parse(id);

        return root === '' && !dir.startsWith('.');
      },
      output: {
        dir: 'dist',
      },
    },
  },
  plugins: [dts(), react()],
});
