import { dirname, join, resolve } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
  addons: [getAbsolutePath('@storybook/addon-essentials'), getAbsolutePath('storybook-dark-mode')],
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  viteFinal: (config) => {
    if (config.mode !== 'production') {
      config.optimizeDeps = {
        ...config.optimizeDeps,
        exclude: ['@strapi/ui-primtivies', '@strapi/design-system', '@strapi/icons'],
      };

      if (!config.resolve) {
        config.resolve = {};
      }

      config.resolve.alias = {
        ...config.resolve?.alias,
        '@strapi/ui-primitives': resolve(__dirname, '..', '..', 'packages', 'primitives', 'src'),
        '@strapi/design-system': resolve(__dirname, '..', '..', 'packages', 'strapi-design-system', 'src'),
        '@strapi/design-system/v2': resolve(__dirname, '..', '..', 'packages', 'strapi-design-system', 'src', 'v2'),
        '@strapi/icons': resolve(__dirname, '..', '..', 'packages', 'strapi-icons', 'src'),
      };
    }

    return config;
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
