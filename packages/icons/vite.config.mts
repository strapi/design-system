import { writeFileSync } from 'fs';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  'symbols-index': resolve(__dirname, 'src/symbols-index.ts'),
  'regular-index': resolve(__dirname, 'src/regular-index.ts'),
};

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.json',
      // Include both entry points
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['**/*.config.ts', '**/*.config.mjs', 'test/**/*'],
      outDir: 'dist',
      entryRoot: 'src',
      afterBuild: () => {
        // ESM declarations for the `import` condition; named exports only, matching the .mjs build
        for (const name of Object.keys(entries)) {
          writeFileSync(resolve(__dirname, `dist/${name}.d.mts`), `export * from './${name}.js';\n`);
        }
      },
    }),
    externalizeDeps(),
  ],
  build: {
    lib: {
      entry: entries,
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => (format === 'es' ? `${entryName}.mjs` : `${entryName}.js`),
    },
  },
});
