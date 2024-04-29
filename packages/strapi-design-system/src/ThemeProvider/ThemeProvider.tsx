/**
 * TODO: remove this in v2 in favour of DesignSystemProvider, but this is rather convienient for now.
 */
import * as React from 'react';

import { ThemeProvider as StyledThemeProvider, createGlobalStyle, DefaultTheme, css } from 'styled-components';

import { LiveRegions } from '../LiveRegions/LiveRegions';
import { lightTheme } from '../themes';

const GlobalStyle = createGlobalStyle`
${css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    /* Sets 1rem === 10px */
    font-size: 62.5%;
  }

  body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    font: unset;
  }

  #root {
    isolation: isolate;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
  }

  /* Focusing the button with a mouse, touch, or stylus will show a subtle drop shadow. */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  .lock-body-scroll {
    height: 100vh;
    overflow-y: hidden;
  }
`}
`;

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: DefaultTheme;
}

export const ThemeProvider = ({ children, theme = lightTheme }: ThemeProviderProps) => {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
      <LiveRegions />
      <GlobalStyle />
    </StyledThemeProvider>
  );
};
