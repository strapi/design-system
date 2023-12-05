import * as React from 'react';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { parse } from 'qs';

import { VisuallyHidden, DesignSystemProvider, Box, darkTheme, lightTheme } from '@strapi/design-system';

import { createCustomTheme } from './utils/createCustomTheme';

const preview: Preview = {
  decorators: [
    (Story) => (
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
    ),
  ],
  parameters: {
    options: {
      storySort: {
        order: ['Design System', ['Primitives', 'Technical Components', 'Components']],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    darkMode: {
      // Override the default dark theme
      dark: createCustomTheme({ theme: darkTheme, asStorybookTheme: false }),
      // Override the default light theme
      light: createCustomTheme({ theme: lightTheme, asStorybookTheme: false }),
    },
  },
};

const themeQueryURL = parse(document.location.search).theme;

const Theme = ({ children }: { children: React.ReactNode }) => {
  const isDarkAddon = useDarkMode();
  const [isDark, setIsDark] = React.useState(themeQueryURL || isDarkAddon);

  React.useEffect(() => {
    if (!themeQueryURL && isDarkAddon !== isDark) {
      setIsDark(isDarkAddon);
    }
  }, [isDarkAddon, isDark]);

  return (
    <DesignSystemProvider locale="en" theme={isDark ? darkTheme : lightTheme}>
      <Box flex="1 0 100%" padding={2} background="neutral0">
        {children}
      </Box>
    </DesignSystemProvider>
  );
};

export default preview;
