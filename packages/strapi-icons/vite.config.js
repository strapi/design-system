import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, './src/index.js'),
      formats: ['cjs', 'es'],
      fileName(format) {
        return `[name].${format === 'es' ? 'js' : format}`;
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: (id) => !id.startsWith('.') && !id.startsWith('/'),
      output: {
        dir: 'dist',
        preserveModules: true,
      },
    },
  },
  plugins: [react()],
});
