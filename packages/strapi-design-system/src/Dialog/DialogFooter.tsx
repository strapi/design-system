import React from 'react';

import styled from 'styled-components';

import { Box } from '../Box';
import { Flex } from '../Flex';

const FooterWrapper = styled(Box)`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};

  button {
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }
`;

export interface DialogFooterProps {
  startAction?: React.ReactNode;
  endAction?: React.ReactNode;
}

export const DialogFooter = ({ startAction, endAction }: DialogFooterProps) => {
  return (
    <FooterWrapper padding={4}>
      <Flex gap={2}>
        {startAction}
        {endAction}
      </Flex>
    </FooterWrapper>
  );
};
