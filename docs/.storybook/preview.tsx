import * as React from 'react';
import { Preview } from '@storybook/react-vite';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { parse } from 'qs';

import { DesignSystemProvider, Box, darkTheme, lightTheme, type BoxProps } from '@strapi/design-system';

import { DocsContainer, Unstyled } from '@storybook/addon-docs/blocks';
import { styled, DefaultTheme } from 'styled-components';
import { MARKDOWN_OVERRIDES } from '../components/Markdown';

const createCustomTheme = (theme: DefaultTheme, base: 'light' | 'dark' = 'light') => {
  return {
    base,
    brandTitle: 'Strapi Design System',
    brandUrl: 'https://strapi.io/',
    brandImage: base === 'light' ? '/site/logo.svg' : '/site/logo_dark.svg',

    //
    colorPrimary: theme.colors.primary600,
    colorSecondary: theme.colors.secondary600,

    // UI
    appBg: theme.colors.neutral100,
    appContentBg: theme.colors.neutral0,
    appPreviewBg: theme.colors.neutral0,
    appBorderColor: theme.colors.neutral200,

    // Text colors
    textColor: theme.colors.neutral800,
    textInverseColor: theme.colors.neutral800,

    // Toolbar default and active colors
    barTextColor: theme.colors.neutral800,
    barSelectedColor: theme.colors.primary600,
    barHoverColor: theme.colors.primary600,
    barBg: theme.colors.neutral0,

    // Form colors
    inputBg: theme.colors.neutral0,
    inputBorder: theme.colors.neutral800,
    inputTextColor: theme.colors.neutral800,
  };
};

const themeQueryURL = parse(document.location.search).theme;

// Reusable hook to get dark mode state from localStorage
export const useLocalStorageDarkMode = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (themeQueryURL) return themeQueryURL;

    const themeParameters = localStorage.getItem('sb-addon-themes-3');
    let theme = 'light';
    try {
      theme = JSON.parse(themeParameters || '{}').current;
    } catch (error) {
      console.error(error);
    }
    return theme === 'dark';
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      const themeParameters = localStorage.getItem('sb-addon-themes-3');
      let theme = 'light';
      try {
        theme = JSON.parse(themeParameters || '{}').current;
      } catch (error) {
        console.error(error);
      }
      setIsDark(theme === 'dark');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return isDark;
};

// Safe hook that tries useDarkMode first, then falls back to localStorage
export const useSafeDarkMode = () => {
  try {
    return useDarkMode();
  } catch (error) {
    return useLocalStorageDarkMode();
  }
};

const Theme = ({ children, isDarkMode, ...props }: BoxProps & { isDarkMode?: boolean }) => {
  const [isDark, setIsDark] = React.useState(() => {
    if (themeQueryURL) return themeQueryURL;
    if (isDarkMode !== undefined) return isDarkMode;

    const themeParameters = localStorage.getItem('sb-addon-themes-3');
    let theme = 'light';
    try {
      theme = JSON.parse(themeParameters || '{}').current;
    } catch (error) {
      console.error(error);
    }
    return theme === 'dark';
  });

  React.useEffect(() => {
    if (!themeQueryURL && isDarkMode !== undefined && isDarkMode !== isDark) {
      setIsDark(isDarkMode);
    }
  }, [isDarkMode, isDark]);

  // Listen for theme changes in localStorage for docs
  React.useEffect(() => {
    if (isDarkMode === undefined) {
      const handleStorageChange = () => {
        const themeParameters = localStorage.getItem('sb-addon-themes-3');
        let theme = 'light';
        try {
          theme = JSON.parse(themeParameters || '{}').current;
        } catch (error) {
          console.error(error);
        }
        setIsDark(theme === 'dark');
      };
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isDarkMode]);

  return (
    <DesignSystemProvider locale="en" theme={isDark ? darkTheme : lightTheme}>
      <Main tag="main" background="neutral0" padding="4rem" paddingBottom="8rem" height="100%">
        <Box maxWidth="84rem" margin="auto" height="100%" {...props}>
          {children}
        </Box>
      </Main>
    </DesignSystemProvider>
  );
};

const Main = styled(Box)`
  .sbdocs-preview {
    border: solid 1px ${(props) => props.theme.colors.neutral200};

    .docs-story > div {
      background: ${(props) => props.theme.colors.neutral0};
    }
  }

  .docblock-argstable {
    border: solid 1px ${(props) => props.theme.colors.neutral200};

    table > tbody {
      border: solid 1px ${(props) => props.theme.colors.neutral200} !important;
    }
  }

  .docblock-argstable tr th {
    color: ${(props) => props.theme.colors.neutral800};
  }

  .docblock-argstable tr td {
    color: ${(props) => props.theme.colors.neutral800} !important;
    background-color: ${(props) => props.theme.colors.neutral0} !important;
    border-inline: unset !important;
    border-block: unset !important;
    border-top: solid 1px ${(props) => props.theme.colors.neutral200} !important;
  }

  .docblock-code-toggle {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.neutral200};
    background: ${(props) => props.theme.colors.neutral150};
    color: ${(props) => props.theme.colors.neutral800};
  }

  .docblock-code-toggle:hover {
    background-color: ${(props) => props.theme.colors.neutral100};
  }
`;

const preview: Preview = {
  decorators: [
    (Story) => {
      const isDarkMode = useDarkMode();
      return (
        <Theme isDarkMode={isDarkMode}>
          <Story />
        </Theme>
      );
    },
  ],

  parameters: {
    viewport: {
      disable: true,
    },
    chromatic: {
      disableSnapshot: true,
      prefersReducedMotion: 'reduce',
    },
    docs: {
      container: ({ children, ...props }: { children: any; context: any }) => (
        <DocsContainer {...props}>
          <Unstyled>
            <Theme>{children}</Theme>
          </Unstyled>
        </DocsContainer>
      ),
      components: MARKDOWN_OVERRIDES,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Welcome', 'Contributing', 'Changelog', 'Migration Guides', ['V1 to V2']],
          'Foundations',
          ['Accessibility', 'Color', 'Elevation', 'Grid', 'Icons', ['Overview', '*'], 'Typography'],
          'Primitives',
          ['Overview', '*'],
          'Inputs',
          'Components',
          'Utilities',
          'Design System',
          ['Technical Components', 'Components'],
        ],
      },
    },
    darkMode: {
      // Override the default dark theme
      dark: createCustomTheme(darkTheme, 'dark'),
      // Override the default light theme
      light: createCustomTheme(lightTheme),
    },
    controls: { expanded: true },
  },
};

export default preview;
