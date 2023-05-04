import { addons } from '@storybook/manager-api';
import { lightTheme } from '@strapi/design-system';
import { createCustomTheme } from './utils/createCustomTheme';

addons.setConfig({
  theme: createCustomTheme({
    theme: lightTheme,
  }),
});
