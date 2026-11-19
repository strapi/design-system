import { dirname, join } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

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
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@strapi/design-system': join(__dirname, '../../packages/design-system/src'),
      // The /next source imports with `@/`, the same alias that the library build sets
      '@': join(__dirname, '../../packages/design-system/src/next'),
    };

    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];

    const optimizeDeps = (viteConfig.optimizeDeps ?? {}) as { exclude?: string[] };
    viteConfig.optimizeDeps = {
      ...optimizeDeps,
      exclude: [...(optimizeDeps.exclude ?? []), '@strapi/design-system'],
    };

    // Storybook already copies docs/public, so Vite must not copy it again
    viteConfig.publicDir = false;

    return viteConfig;
  },

  docs: {},
};

function getAbsolutePath<T extends string>(value: T): T {
  return dirname(require.resolve(join(value, 'package.json'))) as T;
}

export default config;
