import * as React from 'react';

import { styled } from 'styled-components';

import { setOpacity } from '../../helpers/setOpacity';
import { useId } from '../../hooks/useId';
import { useLockScroll } from '../../hooks/useLockScroll';
import { DismissibleLayer } from '../../utilities/DismissibleLayer';
import { FocusTrap } from '../../utilities/FocusTrap';
import { Portal } from '../../utilities/Portal';
import { Box, BoxComponent, BoxProps } from '../Box';
import { Flex, FlexComponent } from '../Flex';
import { Typography, TypographyProps } from '../Typography';

const DialogWrapper = styled<BoxComponent>(Box)`
  inset: 0;
  background: ${({ theme }) => setOpacity(theme.colors.neutral800, 0.2)};
`;

const DialogContainer = styled<BoxComponent>(Box)`
  max-width: 41.2rem;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 10%;
`;

const DialogHeader = styled<FlexComponent>(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export interface DialogProps extends BoxProps {
  onClose: () => void;
  title: string;
  isOpen: boolean;
  as?: TypographyProps<any>['tag'];
}

export const Dialog = ({ onClose, title, as = 'h2', isOpen, id, zIndex = 'dialog', ...props }: DialogProps) => {
  const generatedId = useId(id);

  useLockScroll(isOpen);

  if (!isOpen) {
    return null;
  }

  const labelledBy = `${generatedId}-label`;

  return (
    <Portal>
      <DialogWrapper padding={8} position="fixed" zIndex={zIndex}>
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
                <Typography variant="beta" as={as} id={labelledBy}>
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
