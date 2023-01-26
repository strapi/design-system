import { addons } from '@storybook/addons';
import { lightTheme } from '@strapi/design-system';
import { createCustomTheme } from './utils/createCustomTheme';

addons.setConfig({
  theme: createCustomTheme({
    theme: lightTheme,
    options: {
      base: 'light',
    },
  }),
});
