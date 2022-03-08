import React from 'react';
import { ThemeProvider } from '../../src/ThemeProvider';
import { Box } from '../../src/Box';
import { lightTheme } from '../../src/themes/lightTheme';
import { darkTheme } from '../../src/themes/darkTheme';
import { useThemeType } from '../hooks/useThemeType';

const Theme = ({ children }) => {
  const themeType = useThemeType();

  return (
    <ThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>
      <Box padding={2} background='neutral0'>{children}</Box>
    </ThemeProvider>
  )
};

export default Theme;