import { Cross } from '@strapi/icons';
import { styled } from 'styled-components';

import { Box, BoxComponent } from '../Box';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';

import { useModal } from './ModalContext';

interface ModalHeaderProps {
  children: React.ReactNode;
  closeLabel?: string;
}

const ModalHeaderWrapper = styled<BoxComponent>(Box)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const ModalHeader = ({ children, closeLabel = 'Close the modal' }: ModalHeaderProps) => {
  const onClose = useModal();

  return (
    <ModalHeaderWrapper paddingTop={4} paddingBottom={4} paddingLeft={5} paddingRight={5} background="neutral100">
      <Flex justifyContent="space-between">
        {children}
        <IconButton onClick={onClose} label={closeLabel} withTooltip={false}>
          <Cross />
        </IconButton>
      </Flex>
    </ModalHeaderWrapper>
  );
};
