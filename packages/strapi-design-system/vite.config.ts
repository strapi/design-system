import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import glob from 'tiny-glob';
import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const paths = await glob('./src/**/!(*.spec|*.e2e|*.test).{js,svg,ts,tsx}');

  return {
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    build: {
      emptyOutDir: false,
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
          interop: 'auto',
        },
        plugins: [typescript()],
      },
    },
    plugins: [react()],
  };
});
