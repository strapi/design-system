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
  globalIgnores(['**/storybook-static']),
  {
    extends: compat.extends('@strapi/eslint-config/front/typescript'),
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'testing-library/no-node-access': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'import/no-default-export': 'off',
      'no-console': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDeclaration[source.value='react'][specifiers.0.type='ImportDefaultSpecifier']",
          message: 'Default React import not allowed',
        },
      ],
    },
  },
  {
    files: ['**/*.mdx'],
    extends: compat.extends('plugin:mdx/recommended'),
    rules: {
      'react/jsx-no-undef': 'off',
      'import/namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
]);
