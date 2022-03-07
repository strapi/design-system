import React from 'react';
import { ThemeProvider } from '../../src/ThemeProvider';
import { lightTheme } from '../../src/themes/lightTheme';
import { darkTheme } from '../../src/themes/darkTheme';
import { useThemeType } from '../hooks/useThemeType';

const Theme = ({ children }) => {
  const themeType = useThemeType();

  return (
    <ThemeProvider theme={themeType === 'dark' ? darkTheme : lightTheme}>{children}</ThemeProvider>
  )
};

export default Theme;