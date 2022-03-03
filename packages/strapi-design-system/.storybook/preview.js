import React from 'react';
import { themes } from '@storybook/theming';
import { ThemeProvider } from '../src/ThemeProvider';
import { VisuallyHidden } from '../src/VisuallyHidden';
import { Box } from '../src/Box';
import { lightTheme } from '../src/themes/lightTheme';
// import { darkTheme } from '../src/themes/darkTheme';

export const parameters = {
  options: {
    storySort: {
      order: ['Design System', ['Subatomic', 'Atoms', 'Molecules', 'Organisms', 'Layouts']],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    // Override the default dark theme
    current: 'light',
    dark: { ...themes.dark },
    // Override the default light theme
    light: { ...themes.normal }
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <main>
        <VisuallyHidden>
          {/* Necessary in order to prevent axe core from providing errors on main / heading */}
          <h1>Storybook story</h1>
        </VisuallyHidden>
        <Box height="100%" padding={2}>
          <Story />
        </Box>
      </main>
    </ThemeProvider>
  )
];
