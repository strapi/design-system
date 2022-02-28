import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { FocusTrap } from '../FocusTrap';
import { Portal } from '../Portal';
import { ModalContext } from './ModalContext';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 4;
  inset: 0;
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
  padding: 0 ${({ theme }) => theme.spaces[8]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  width: ${830 / 16}rem;
`;

export const ModalLayout = ({ onClose, labelledBy, ...props }) => {
  //FIX ME (find a way to do it globally)
  useEffect(() => {
    const body = document.body;
    body.classList.add('lock-body-scroll');

    return () => {
      body.classList.remove('lock-body-scroll');
    };
  }, []);

  return (
    <Portal>
      <ModalContext.Provider value={onClose}>
        <ModalWrapper onClick={onClose}>
          <FocusTrap onEscape={onClose}>
            <ModalContent
              aria-labelledby={labelledBy}
              onClick={(e) => e.stopPropagation()}
              background="neutral0"
              hasRadius
              shadow="popupShadow"
              role="dialog"
              aria-modal={true}
              {...props}
            />
          </FocusTrap>
        </ModalWrapper>
      </ModalContext.Provider>
    </Portal>
  );
};

ModalLayout.propTypes = {
  labelledBy: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
