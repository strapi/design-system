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
      propFilter: () => {
        return true;
      },
    },
  },
  viteFinal: (config) => {
    if (config.mode !== 'production') {
      config.optimizeDeps = {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include ?? []),
          'react',
          `react/jsx-runtime`,
          'react-dom/client',
          'styled-components',
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude ?? []),
          '@strapi/ui-primtivies',
          '@strapi/design-system',
          '@strapi/icons',
        ],
      };

      if (!config.resolve) {
        config.resolve = {};
      }

      config.resolve.dedupe = [
        ...(config.resolve?.dedupe ?? []),
        'react',
        'react-dom',
        'react-router-dom',
        'styled-components',
      ];

      config.resolve.alias = {
        ...config.resolve?.alias,
        '@strapi/ui-primitives': resolve(__dirname, '..', '..', 'packages', 'primitives', 'src'),
        '@strapi/design-system': resolve(__dirname, '..', '..', 'packages', 'strapi-design-system', 'src'),
        '@strapi/icons': resolve(__dirname, '..', '..', 'packages', 'strapi-icons', 'src'),
        'styled-components': resolve(__dirname, '..', '..', 'node_modules', 'styled-components'),
      };
    }

    return config;
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
