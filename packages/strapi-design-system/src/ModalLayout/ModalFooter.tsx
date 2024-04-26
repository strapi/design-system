import styled from 'styled-components';

import { Box, BoxComponent } from '../Box';
import { Flex } from '../Flex';

export interface ModalFooterProps {
  endActions?: React.ReactNode;
  startActions?: React.ReactNode;
}

const ModalFooterWrapper = styled<BoxComponent>(Box)`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const ModalFooter = ({ startActions, endActions }: ModalFooterProps) => {
  return (
    <ModalFooterWrapper paddingTop={4} paddingBottom={4} paddingLeft={5} paddingRight={5} background="neutral100">
      <Flex justifyContent="space-between">
        <Flex gap={2}>{startActions}</Flex>
        <Flex gap={2}>{endActions}</Flex>
      </Flex>
    </ModalFooterWrapper>
  );
};
