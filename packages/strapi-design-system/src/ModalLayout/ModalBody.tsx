import styled from 'styled-components';

import { Box, BoxComponent, BoxProps } from '../Box';

const ModalBodyWrapper = styled<BoxComponent>(Box)`
  overflow: auto;
  max-height: 60vh;
`;

export const ModalBody = (props: BoxProps) => {
  return <ModalBodyWrapper padding={7} {...props} />;
};
