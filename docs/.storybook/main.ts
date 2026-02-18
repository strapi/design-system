import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],

  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@vueless/storybook-dark-mode'),
  ],

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: 'react-docgen',
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  // Ensure docgen can see source files in production builds.
  // This keeps ArgTypes working by avoiding dependency pre-bundling of the workspace package.
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@strapi/design-system': join(__dirname, '../../packages/design-system/src'),
    };

    const optimizeDeps = (config.optimizeDeps ?? {}) as { exclude?: string[] };
    config.optimizeDeps = {
      ...optimizeDeps,
      exclude: [...(optimizeDeps.exclude ?? []), '@strapi/design-system'],
    };

    return config;
  },

  docs: {},
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
