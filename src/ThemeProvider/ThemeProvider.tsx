import * as React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

import { Theme, ThemeProps } from './types';

const GlobalStyle = createGlobalStyle`
  input,button,textarea {
    &:focus {
    box-shadow: 0px 0px 6px ${(props: ThemeProps) => props.theme.color.aqua700};
    // Windows High Contrast won't see the bow shadow but transparent will
    // be replaced by a color
    // See https://sarahmhigley.com/writing/whcm-quick-tips/ for more details
    outline: 4px solid transparent;
  }
  }
`;

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: Theme;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
