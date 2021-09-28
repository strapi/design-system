import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { FocusTrap } from '../FocusTrap';
import { Portal } from '../Portal';
import { ModalContext } from './ModalContext';

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 4;
  inset: 0;
  // this is theme.colors.neutral200 with opacity
  background: rgb(220, 220, 228, 0.8);
  padding: 0 ${({ theme }) => theme.spaces[8]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  width: ${830 / 16}rem;
`;

export const ModalLayout = ({ onClose, labelledBy, ...props }) => {
  const modalContentRef = useRef();

  //FIX ME (find a way to do it globally)
  useEffect(() => {
    const body = document.body;
    body.classList.add('lock-body-scroll');
    document.addEventListener('mousedown', handleClickAway);

    return () => {
      body.classList.remove('lock-body-scroll');
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClickAway = (e) => {
    if (modalContentRef.current.contains(e.target)) {
      return;
    }

    onClose();
  };

  return (
    <Portal>
      <ModalContext.Provider value={onClose}>
        <ModalWrapper>
          <FocusTrap onEscape={onClose}>
            <ModalContent
              aria-labelledby={labelledBy}
              ref={modalContentRef}
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
