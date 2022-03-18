import React, { useEffect, useState } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { parse } from 'qs';
import { ThemeProvider } from '../../src/ThemeProvider';
import { Box } from '../../src/Box';
import { lightTheme } from '../../src/themes/lightTheme';
import { darkTheme } from '../../src/themes/darkTheme';

const themeQueryURL = parse(document.location.search).theme;

const Theme = ({ children }) => {
  const isDarkAddon = useDarkMode();
  const [isDark, setIsDark] = useState(themeQueryURL || isDarkAddon);

  useEffect(() => {
    if(!themeQueryURL && isDarkAddon !== isDark) {
      setIsDark(isDarkAddon);
    }
  }, [isDarkAddon, isDark]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  )
};

export default Theme;