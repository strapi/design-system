import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';

const ModalBodyWrapper = styled(Box)`
  overflow: auto;
  max-height: 60vh;
`;

export const ModalBody = (props) => {
  return <ModalBodyWrapper padding={7} {...props} />;
};
