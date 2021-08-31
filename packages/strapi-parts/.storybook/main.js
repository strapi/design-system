const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx)', './Icons.stories.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    // Fix that allows to fix storybook issues with core-js
    // https://github.com/storybookjs/storybook/issues/11255
    config.resolve.alias['core-js'] = path.dirname(require.resolve('core-js'));
    config.resolve.alias['@strapi/icons'] = path.dirname(require.resolve('../../strapi-icons/dist'));
    return config;
  },
};
