import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import glob from 'tiny-glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(async () => {
  const paths = await glob('./src/**/!(*.spec|*.e2e|*.test).{js,svg,ts,tsx}');

  return {
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    build: {
      /**
       * TODO: when we remove the `preserveModules` option, we need to add the `minify` option back.
       */
      minify: false,
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
    // We need to pass entryRoot: 'src' as an argument to dts because otherwise when we run the build,
    // a src folder is generated inside the dist folder containing all the d.ts files.
    // This is due to how the tsconfig.json file was defined, specifically this part:
    //  "baseUrl": ".",
    //  "paths": {
    //    "@test/*": ["./test/*"]
    //  }
    plugins: process.env.DTS !== 'true' ? [react()] : [dts({ entryRoot: 'src' }), react()],
  };
});
