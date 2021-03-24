import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  input,button,textarea {
    &:focus {
    box-shadow: 0px 0px 6px ${(props) => props.theme.color.aqua700};
    // Windows High Contrast won't see the bow shadow but transparent will
    // be replaced by a color
    // See https://sarahmhigley.com/writing/whcm-quick-tips/ for more details
    outline: 4px solid transparent;
  }
  }
`;

export const ThemeProvider = ({ children, theme }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};
