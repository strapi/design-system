import { addons } from '@storybook/addons';
import { lightTheme } from '../src/themes/lightTheme';
import { createCustomTheme } from './utils/createCustomTheme';

addons.setConfig({
  theme: createCustomTheme({
    theme: lightTheme,
    options: {
      base: 'light',
    },
  }),
});
