import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import glob from 'tiny-glob';

export default glob('./src/**/!(*.spec|*.e2e|*.test).{js,svg,ts,tsx}').then(async (paths) => {
  return defineConfig({
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    build: {
      target: 'esnext',
      lib: {
        entry: {},
        formats: ['cjs', 'es'],
        fileName(format) {
          return `[name].${format === 'es' ? 'js' : format}`;
        },
      },
      rollupOptions: {
        input: [resolve(__dirname, './src/index.ts'), ...paths.map((path) => `./${path}`)],
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: (id) => !id.startsWith('.') && !id.startsWith('/'),
        output: {
          dir: 'dist',
          preserveModules: true,
        },
        plugins: [typescript()],
      },
    },
    plugins: [react()],
  });
});
