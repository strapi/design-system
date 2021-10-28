import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';

const ModalBodyWrapper = styled(Box)`
  overflow: auto;
  max-height: 60vh;
`;

export const ModalBody = (props) => {
  return <ModalBodyWrapper paddingTop={6} paddingBottom={6} paddingLeft={8} paddingRight={8} {...props} />;
};
