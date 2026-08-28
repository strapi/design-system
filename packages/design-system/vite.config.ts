import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: './tsconfig.json',
      exclude: ['**/*.config.ts', '**/*.config.mjs', 'test/**/*', 'src/next/**/*.test.*'],
      outDir: 'dist',
      entryRoot: 'src',
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
