import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainWrapper = styled.main`
  outline: none;
`;

export const Main = ({ labelledBy, ...props }) => {
  return <MainWrapper aria-labelledby={labelledBy} id="main-content" tabIndex={-1} {...props} />;
};

Main.propTypes = {
  labelledBy: PropTypes.string.isRequired,
};
