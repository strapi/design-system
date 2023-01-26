const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-dark-mode'],
  staticDirs: ['../public'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    /**
     * This is used to avoid webpack import errors where
     * the origin is strict EcmaScript Module.
     *
     * e. g. a module with javascript mimetype, a '.mjs' file,
     * or a '.js' file where the package.json contains '"type": "module"'
     */
    config.module.rules.push({
      test: /\.m?jsx?$/,
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
};
