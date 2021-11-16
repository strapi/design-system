import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/ThemeProvider';
import { VisuallyHidden } from '../src/VisuallyHidden';
import { lightTheme } from '../src/themes/light-theme';
import { MainNavProvider } from '../src/MainNav';

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
    const [condensed, setCondensed] = React.useState(false);
    return (
      <MemoryRouter>
        <ThemeProvider theme={lightTheme}>
          <MainNavProvider condensed={condensed} onCondense={setCondensed}>
            <main>
              <VisuallyHidden>
                {/* Necessary in order to prevent axe core from providing errors on main / heading */}
                <h1>Storybook story</h1>
              </VisuallyHidden>

              <Story />
            </main>
          </MainNavProvider>
        </ThemeProvider>
      </MemoryRouter>
    );
  },
];
