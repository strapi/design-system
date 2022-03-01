import React from 'react';
import { parse } from 'qs';
import { ThemeProvider } from '../src/ThemeProvider';
import { VisuallyHidden } from '../src/VisuallyHidden';
import { Box } from '../src/Box';
import { lightTheme } from '../src/themes/lightTheme';
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
  (Story) => {
    const themeQueryURL = parse(document.location.search).theme;

    let theme;
    if(themeQueryURL === 'dark') {
      theme = 'dark';
    } else {
      theme = 'light';
    };
    
    return (
      <>
        {theme === 'dark' ? 
          (<ThemeProvider theme={darkTheme}>
            <main>
              <VisuallyHidden>
                {/* Necessary in order to prevent axe core from providing errors on main / heading */}
                <h1>Storybook story</h1>
              </VisuallyHidden>
              <Box background='neutral100' padding={2}>
                <Story />
              </Box>
            </main>
          </ThemeProvider>) 
          : 
          (<ThemeProvider theme={lightTheme}>
            <main>
              <VisuallyHidden>
                {/* Necessary in order to prevent axe core from providing errors on main / heading */}
                <h1>Storybook story</h1>
              </VisuallyHidden>
              <Story />
            </main>
          </ThemeProvider>)}
      </>
    )
  },
];
