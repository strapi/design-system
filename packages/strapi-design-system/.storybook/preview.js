import React from 'react';
import { ThemeProvider } from '../src/ThemeProvider';
import { VisuallyHidden } from '../src/VisuallyHidden';
import { lightTheme } from '../src/themes/light-theme';
import { Main, SkipToContent } from '../src/Main';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <SkipToContent>Skip to main content</SkipToContent>
      <Main labelledBy="main">
        <VisuallyHidden>
          {/* Necessary in order to prevent axe core from providing errors on main / heading */}
          <h1 id="main">This is a storybook story</h1>
        </VisuallyHidden>

        <Story />
      </Main>
    </ThemeProvider>
  ),
];
