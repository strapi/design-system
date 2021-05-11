import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';

const AnchorBox = styled(Box)`
  text-decoration: none;
  position: absolute;
  left: -100%;
  top: -100%;

  &:focus {
    left: ${({ theme }) => theme.spaces[3]};
    top: ${({ theme }) => theme.spaces[3]};
  }
`;

export const SkipToContent = (props) => {
  return (
    <AnchorBox as="a" href="#main-content" background="primary600" color="neutral0" padding={3} hasRadius {...props} />
  );
};
