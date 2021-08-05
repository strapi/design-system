import PropTypes from 'prop-types';
import * as React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from '../GlobalStyle';
import { ScopedStyle } from '../ScopedStyle';

export const ThemeProvider = ({ children, theme, scopedCss = false }) => {
  return (
    <StyledThemeProvider theme={theme}>
      {scopedCss ? (
        <ScopedStyle>{children}</ScopedStyle>
      ) : (
        <>
          <GlobalStyle />
          {children}
        </>
      )}
    </StyledThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  scopedCss: PropTypes.bool,
  theme: PropTypes.object.isRequired,
};
