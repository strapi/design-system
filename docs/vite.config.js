import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig((env) => {
  const config = {
    plugins: [react()],
  };

  if (env.mode !== 'production') {
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
      '@strapi/ui-primitives': resolve(__dirname, '..', 'packages', 'primitives', 'src'),
      '@strapi/design-system': resolve(__dirname, '..', 'packages', 'design-system', 'src'),
      '@strapi/icons': resolve(__dirname, '..', 'packages', 'icons', 'src'),
      'styled-components': resolve(__dirname, '..', 'node_modules', 'styled-components'),
    };
  }

  return config;
});
