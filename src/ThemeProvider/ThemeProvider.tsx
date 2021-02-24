import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Theme } from './types';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
