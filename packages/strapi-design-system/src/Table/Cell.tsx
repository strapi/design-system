import React from 'react';

import styled from 'styled-components';

import { Flex } from '../Flex';
import { RawTh, RawTd, RawTdProps } from '../RawTable/RawCell';

const CellWrapper = styled(RawTd)`
  vertical-align: middle;
  text-align: left;
  color: ${({ theme }) => theme.colors.neutral600};
  outline-offset: -4px;

  /**
  * Hack to make sure the checkbox looks aligned
  */
  input {
    vertical-align: sub;
  }
`;

const ActionWrapper = styled.span`
  svg {
    height: ${4 / 16}rem;
  }
`;

export interface ThProps extends RawTdProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const Th = ({ children, action, ...props }: ThProps) => {
  return (
    <CellWrapper as={RawTh} {...props}>
      <Flex>
        {children}
        <ActionWrapper>{action}</ActionWrapper>
      </Flex>
    </CellWrapper>
  );
};

export const Td = ({ children, ...props }: RawTdProps) => {
  return <CellWrapper {...props}>{children}</CellWrapper>;
};
