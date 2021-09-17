import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { FocusTrap } from '../FocusTrap';
import { setOpacity } from '../helpers/setOpacity';
import useLockScroll from '../helpers/useLockScroll';
import { Portal } from '../Portal';
import { Row } from '../Row';
import { H2 } from '../Text';
import { useId } from '../helpers/useId';

const DialogWrapper = styled.div`
  position: absolute;
  z-index: 3;
  inset: 0;
  background: ${({ theme }) => setOpacity(theme.colors.neutral800, 0.2)};
  padding: 0 ${({ theme }) => theme.spaces[8]};
`;

const DialogContainer = styled(Box)`
  max-width: ${412 / 16}rem;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 10%;
`;

const DialogHeader = styled(Row)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const Dialog = ({ onClose, title, as, isOpen, id, ...props }) => {
  const generatedId = useId('dialog', id);

  useLockScroll(isOpen);

  if (!isOpen) {
    return null;
  }

  const labelledBy = `${generatedId}-label`;

  return (
    <Portal>
      <DialogWrapper>
        <FocusTrap onEscape={onClose}>
          <DialogContainer
            aria-labelledby={labelledBy}
            aria-modal={true}
            background="neutral0"
            hasRadius
            shadow="popupShadow"
            role="dialog"
          >
            <DialogHeader padding={6} justifyContent="center">
              <H2 as={as} id={labelledBy}>
                {title}
              </H2>
            </DialogHeader>
            <Box {...props} />
          </DialogContainer>
        </FocusTrap>
      </DialogWrapper>
    </Portal>
  );
};

Dialog.displayName = 'Dialog';

Dialog.defaultProps = {
  as: 'h2',
  id: undefined,
};

Dialog.propTypes = {
  as: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
