import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../Box';
import { DismissibleLayer } from '../DismissibleLayer';
import { Flex } from '../Flex';
import { FocusTrap } from '../FocusTrap';
import { setOpacity } from '../helpers/setOpacity';
import { useId } from '../hooks/useId';
import useLockScroll from '../hooks/useLockScroll';
import { Portal } from '../Portal';
import { Typography } from '../Typography';

const DialogWrapper = styled(Box)`
  inset: 0;
  background: ${({ theme }) => setOpacity(theme.colors.neutral800, 0.2)};
`;

const DialogContainer = styled(Box)`
  max-width: ${412 / 16}rem;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 10%;
`;

const DialogHeader = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const Dialog = ({ onClose, title, as, isOpen, id, ...props }) => {
  const generatedId = useId(id);

  useLockScroll(isOpen);

  if (!isOpen) {
    return null;
  }

  const labelledBy = `${generatedId}-label`;

  return (
    <Portal>
      <DialogWrapper padding={8} position="fixed" zIndex={4}>
        <FocusTrap>
          <DismissibleLayer onEscapeKeyDown={onClose} onPointerDownOutside={onClose}>
            <DialogContainer
              aria-labelledby={labelledBy}
              aria-modal
              background="neutral0"
              hasRadius
              shadow="popupShadow"
              role="dialog"
            >
              <DialogHeader padding={6} justifyContent="center">
                <Typography variant="beta" as={as || 'h2'} id={labelledBy}>
                  {title}
                </Typography>
              </DialogHeader>
              <Box {...props} />
            </DialogContainer>
          </DismissibleLayer>
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
