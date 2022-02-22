import React from 'react';
import { ThemeProvider } from '../src/ThemeProvider';
import { VisuallyHidden } from '../src/VisuallyHidden';
import { darkTheme } from '../src/themes/darkTheme';

export const parameters = {
  options: {
    storySort: {
      order: ['Design System', ['Subatomic', 'Atoms', 'Molecules', 'Organisms', 'Layouts']],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
      <ThemeProvider theme={darkTheme}>
        <main>
          <VisuallyHidden>
            {/* Necessary in order to prevent axe core from providing errors on main / heading */}
            <h1>Storybook story</h1>
          </VisuallyHidden>

          <Story />
        </main>
      </ThemeProvider>
  ),
];
