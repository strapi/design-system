import * as React from 'react';
import { Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { parse } from 'qs';

import { DesignSystemProvider, Box, darkTheme, lightTheme } from '@strapi/design-system';

import { createCustomTheme } from './utils/createCustomTheme';

import type { BoxProps } from '@strapi/design-system';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme padding={2}>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    docs: {
      container: ({ children, ...props }) => (
        <Theme padding={6} paddingLeft={10} paddingRight={10} {...props}>
          <Box maxWidth="80rem" margin="auto">
            {children}
          </Box>
        </Theme>
      ),
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Welcome', 'Contributing', 'Changelog'],
          'Foundations',
          ['Overview', 'Icons', ['Overview', '*']],
          'Primitives',
          ['Overview', '*'],
          'Inputs',
          'Design System',
          ['Technical Components', 'Components'],
          'Utilities',
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
    },
    darkMode: {
      // Override the default dark theme
      dark: createCustomTheme({ theme: darkTheme, asStorybookTheme: false }),
      // Override the default light theme
      light: createCustomTheme({ theme: lightTheme, asStorybookTheme: false }),
    },
  },
};

const themeQueryURL = parse(document.location.search).theme;

const Theme = ({ children, ...props }: BoxProps) => {
  const isDarkAddon = useDarkMode();
  const [isDark, setIsDark] = React.useState(themeQueryURL || isDarkAddon);

  React.useEffect(() => {
    if (!themeQueryURL && isDarkAddon !== isDark) {
      setIsDark(isDarkAddon);
    }
  }, [isDarkAddon, isDark]);

  return (
    <DesignSystemProvider locale="en" theme={isDark ? darkTheme : lightTheme}>
      <Box flex="1 0 100%" background="neutral0">
        <main>
          <Box height="100%" {...props}>
            {children}
          </Box>
        </main>
      </Box>
    </DesignSystemProvider>
  );
};

export default preview;
