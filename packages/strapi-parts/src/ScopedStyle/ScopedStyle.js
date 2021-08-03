import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const ScopedStyleRoot = styled.div`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
  */
  & div,
  & span,
  & applet,
  & object,
  & iframe,
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6,
  & p,
  & blockquote,
  & pre,
  & a,
  & abbr,
  & acronym,
  & address,
  & big,
  & cite,
  & code,
  & del,
  & dfn,
  & em,
  & img,
  & ins,
  & kbd,
  & q,
  & s,
  & samp,
  & small,
  & strike,
  & strong,
  & sub,
  & sup,
  & tt,
  & var,
  & b,
  & u,
  & i,
  & center,
  & dl,
  & dt,
  & dd,
  & ol,
  & ul,
  & li,
  & fieldset,
  & form,
  & label,
  & legend,
  & table,
  & caption,
  & tbody,
  & tfoot,
  & thead,
  & tr,
  & th,
  & td,
  & article,
  & aside,
  & canvas,
  & details,
  & embed,
  & figure,
  & figcaption,
  & footer,
  & header,
  & hgroup,
  & menu,
  & nav,
  & output,
  & ruby,
  & section,
  & summary,
  & time,
  & mark,
  & audio,
  & video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  & article,
  & aside,
  & details,
  & figcaption,
  & figure,
  & footer,
  & header,
  & hgroup,
  & menu,
  & nav,
  & section {
    display: block;
  }
  line-height: 1;
  & ol,
  & ul {
    list-style: none;
  }
  & blockquote,
  & q {
    quotes: none;
  }
  & blockquote:before,
  & blockquote:after,
  & q:before,
  & q:after {
    content: '';
    content: none;
  }
  & table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* Custom styles */
  & *,
  & *:before,
  & *:after {
    box-sizing: border-box;
  }
  /* Focusing the button with a mouse, touch, or stylus will show a subtle drop shadow. */
  & *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
    box-shadow: revert;
  }
  & *:focus:not(:focus-visible) {
    outline: none;
  }
  height: 100%;
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  & button {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font-size: 100%;
    cursor: pointer;
    font: inherit;
  }
`;

export const ScopedStyle = ({ children }) => {
  return <ScopedStyleRoot>{children}</ScopedStyleRoot>;
};

ScopedStyle.propTypes = {
  children: PropTypes.node.isRequired,
};
