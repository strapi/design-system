import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { H2 } from '../Text';
import { FocusTrap } from '../FocusTrap';
import { Portal } from '../Portal';

const DialogWrapper = styled.div`
  position: absolute;
  z-index: 3;
  inset: 0;
  // theme.colors.neutral800 with opacity
  background: rgba(50, 50, 77, 0.2);
  padding: 0 ${({ theme }) => theme.spaces[8]};
`;

const DialogContainer = styled(Box)`
  max-width: ${412 / 16}rem;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 10%;
`;

const DialogHeader = styled(Box)`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const Dialog = ({ onClose, labelledBy, title, ...props }) => {
  return (
    <Portal>
      <DialogWrapper>
        <FocusTrap onEscape={onClose}>
          <DialogContainer
            aria-labelledby={labelledBy}
            background="neutral0"
            hasRadius
            shadow="popupShadow"
            role="dialog"
            aria-modal={true}
          >
            <DialogHeader padding={6}>
              <H2>{title}</H2>
            </DialogHeader>
            <Box {...props} />
          </DialogContainer>
        </FocusTrap>
      </DialogWrapper>
    </Portal>
  );
};

Dialog.displayName = 'Dialog  ';

Dialog.defaultProps = {
  title: 'Title',
};

Dialog.propTypes = {
  labelledBy: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
