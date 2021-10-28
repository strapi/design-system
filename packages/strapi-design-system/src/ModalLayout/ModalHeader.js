import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cross from '@strapi/icons/Cross';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { useModal } from './ModalContext';

const ModalHeaderWrapper = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const ModalHeader = ({ children, closeLabel }) => {
  const onClose = useModal();

  return (
    <ModalHeaderWrapper paddingTop={4} paddingBottom={4} paddingLeft={5} paddingRight={5} background="neutral100">
      <Flex justifyContent="space-between">
        {children}
        <IconButton onClick={onClose} aria-label={closeLabel} icon={<Cross />} />
      </Flex>
    </ModalHeaderWrapper>
  );
};

ModalHeader.defaultProps = {
  closeLabel: 'Close the modal',
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string,
};
