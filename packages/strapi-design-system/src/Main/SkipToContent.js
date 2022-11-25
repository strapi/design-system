import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';

const AnchorBox = styled(Box)`
  text-decoration: none;
  position: absolute;
  z-index: 9999;
  left: -100%;
  top: -100%;

  &:focus {
    left: ${({ theme }) => theme.spaces[3]};
    top: ${({ theme }) => theme.spaces[3]};
  }
`;

export const SkipToContent = ({ children }) => {
  return (
    <AnchorBox as="a" href="#main-content" background="primary600" color="neutral0" padding={3} hasRadius>
      {children}
    </AnchorBox>
  );
};

SkipToContent.propTypes = {
  children: PropTypes.node.isRequired,
};
