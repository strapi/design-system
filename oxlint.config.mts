import { defineConfig } from 'oxlint';

import strapiLint from './packages/design-system/src/next/lint.ts';

export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'import', 'promise', 'jest'],
  // Oxlint does not accept settings in overrides, so the preset settings go here
  settings: {
    ...strapiLint.settings,
    react: {
      version: '18',
    },
  },
  env: {
    browser: true,
  },
  ignorePatterns: ['**/.next/**', '**/node_modules/**', '**/dist/**', '**/storybook-static/**', '**/*.mdx', 'website'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    style: 'off',
    pedantic: 'off',
  },
  rules: {
    'typescript/no-unused-vars': 'error',
    'typescript/no-explicit-any': 'warn',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/refs': 'off',
    'react/immutability': 'off',
    'react/purity': 'off',
    'react/set-state-in-effect': 'off',
    'react/incompatible-library': 'off',
    'jsx-a11y/prefer-tag-over-role': 'off',
    'eslint/no-underscore-dangle': 'off',
    'jest/no-disabled-tests': 'warn',
    'unicorn/consistent-function-scoping': [
      'error',
      {
        checkArrowFunctions: false,
      },
    ],
  },
  overrides: [
    {
      files: ['packages/design-system/**/*.{ts,tsx,js,jsx}'],
      rules: {
        'import/export': 'off',
      },
    },
    {
      files: ['packages/design-system/src/next/**'],
      jsPlugins: strapiLint.jsPlugins,
      rules: {
        ...strapiLint.rules,
        'react/refs': 'error',
        'react/immutability': 'error',
        'react/purity': 'error',
        'react/set-state-in-effect': 'error',
        'react/incompatible-library': 'error',
        'shadcn/no-inline-styles': 'error',
        'shadcn/require-static-classes': 'error',
        'shadcn/no-unknown-classes': 'error',
      },
    },
    // Code from the shadcn CLI uses arbitrary values
    {
      files: ['packages/design-system/src/next/components/ui/**'],
      rules: {
        'shadcn/no-restyle': 'off',
        'shadcn/no-arbitrary-values': 'off',
      },
    },
    {
      files: ['docs/stories/06-next/**'],
      jsPlugins: strapiLint.jsPlugins,
      rules: strapiLint.rules,
    },
    {
      files: ['**/*.{spec,test}.{ts,tsx,js,jsx}'],
      env: {
        jest: true,
      },
      rules: {
        'unicorn/consistent-function-scoping': 'off',
      },
    },
    {
      files: ['docs/**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'import/no-default-export': 'off',
        'no-console': 'off',
      },
    },
  ],
});
