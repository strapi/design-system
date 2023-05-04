import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { VisuallyHidden, Box, darkTheme, lightTheme } from '@strapi/design-system';

import { createCustomTheme } from './utils/createCustomTheme';
import Theme from './components/Theme';

const dark = createCustomTheme({
  theme: darkTheme,
  options: {
    base: 'dark',
  },
  asStorybookTheme: false,
});

const light = createCustomTheme({ theme: lightTheme, asStorybookTheme: false });

export const parameters = {
  options: {
    storySort: {
      order: ['Design System', ['Primitives', 'Technical Components', 'Components']],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    // Override the default dark theme
    dark,
    // Override the default light theme
    light,
  },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Theme>
        <main>
          <VisuallyHidden>
            {/* Necessary in order to prevent axe core from providing errors on main / heading */}
            <h1>Storybook story</h1>
          </VisuallyHidden>
          <Box height="100%" padding={2}>
            <Story />
          </Box>
        </main>
      </Theme>
    </MemoryRouter>
  ),
];
