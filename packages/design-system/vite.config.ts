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
      // tsconfig.json sets this alias too. Change both, or the build breaks
      '@': resolve(__dirname, 'src/next'),
    },
  },
  build: {
    // Library mode applies build.cssCodeSplit: false, and Vite then rejects a CSS entry
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'next/index': resolve(__dirname, 'src/next/index.ts'),
        // The entry key sets the emitted path
        'next/styles': resolve(__dirname, 'src/next/styles.css'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'mjs' : 'js'}`,
    },
  },
});
