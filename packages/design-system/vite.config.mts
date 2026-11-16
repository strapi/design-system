import { writeFileSync } from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: './tsconfig.json',
      exclude: ['**/*.config.ts', '**/*.config.mjs', 'test/**/*', 'src/next/**/*.test.*'],
      outDir: 'dist',
      entryRoot: 'src',
      afterBuild: () => {
        // ESM declarations for the `import` condition; named exports only, matching the .mjs build
        for (const name of ['index', 'next/index']) {
          writeFileSync(resolve(__dirname, `dist/${name}.d.mts`), `export * from './index.js';\n`);
        }
      },
    }),
    externalizeDeps(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/next'),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'next/index': resolve(__dirname, 'src/next/index.ts'),
        'next/styles': resolve(__dirname, 'src/next/styles.css'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'mjs' : 'js'}`,
    },
  },
});
