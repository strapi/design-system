import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainWrapper = styled.main`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`;

export const Main = ({ labelledBy, ...props }) => {
  const ariaLabelledBy = labelledBy || 'main-content-title';

  return <MainWrapper aria-labelledby={ariaLabelledBy} id="main-content" tabIndex={-1} {...props} />;
};

Main.defaultProps = {
  labelledBy: undefined,
};

Main.propTypes = {
  labelledBy: PropTypes.string,
};
