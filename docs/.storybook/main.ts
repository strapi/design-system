import { dirname, join, resolve } from 'path';
import { mergeConfig } from 'vite';
import turbosnap from 'vite-plugin-turbosnap';
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
  viteFinal: (config, { configType }) => {
    console.log(configType);
    if (configType !== 'PRODUCTION') {
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
          '@strapi/ui-primitives',
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
        '@strapi/design-system': resolve(__dirname, '..', '..', 'packages', 'design-system', 'src'),
        '@strapi/icons': resolve(__dirname, '..', '..', 'packages', 'icons', 'src'),
        'styled-components': resolve(__dirname, '..', '..', 'node_modules', 'styled-components'),
      };

      return config;
    } else {
      return mergeConfig(config, {
        plugins: [
          turbosnap({
            // This should be the base path of your storybook.  In monorepos, you may only need process.cwd().
            rootDir: config.root ?? process.cwd(),
          }),
        ],
      });
    }
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
