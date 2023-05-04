import React, { useEffect, useState } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { parse } from 'qs';
import { ThemeProvider, Box, lightTheme, darkTheme } from '@strapi/design-system';

const themeQueryURL = parse(document.location.search).theme;

const Theme = ({ children }) => {
  const isDarkAddon = useDarkMode();
  const [isDark, setIsDark] = useState(themeQueryURL || isDarkAddon);

  useEffect(() => {
    if (!themeQueryURL && isDarkAddon !== isDark) {
      setIsDark(isDarkAddon);
    }
  }, [isDarkAddon, isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Box flex="1 0 100%" padding={2} background="neutral0">
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Theme;
