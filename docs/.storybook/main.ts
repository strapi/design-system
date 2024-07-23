import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],

  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('@chromatic-com/storybook'),
  ],

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: 'react-docgen',
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {},
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
