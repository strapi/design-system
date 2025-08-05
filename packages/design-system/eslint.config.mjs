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

export default defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**']),
  {
    extends: compat.extends('@strapi/eslint-config/front/typescript'),

    rules: {
      'check-file/no-index': 'off',
      'check-file/filename-naming-convention': 'off',
      'check-file/folder-match-with-fex': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/export': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'testing-library/no-node-access': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-default-export': 'off',
    },
  },
]);
