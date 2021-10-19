import React from 'react';
import styled from 'styled-components';
import { Flex } from '../Flex';

const CarouselActionsWrapper = styled(Flex)`
  & > * + * {
    margin-left: ${({ theme }) => theme.spaces[1]};
  }

  position: absolute;
  width: 100%;
  bottom: ${({ theme }) => theme.spaces[1]};
`;

export const CarouselActions = (props) => {
  return <CarouselActionsWrapper {...props} justifyContent="center" />;
};
