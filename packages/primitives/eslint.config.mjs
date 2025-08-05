import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-default-export
export default defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**', '**/.next/**', '**/storybook-static/**']),
  {
    extends: compat.extends('@strapi/eslint-config/front/typescript'),
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'check-file/folder-match-with-fex': 'off',
      'testing-library/no-node-access': 'off',
      'import/no-default-export': 'off',
    },
  },
]);
