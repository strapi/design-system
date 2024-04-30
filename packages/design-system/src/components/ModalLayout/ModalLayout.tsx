import { styled } from 'styled-components';

import { useLockScroll } from '../../hooks/useLockScroll';
import { Box, BoxProps } from '../Box';
import { DismissibleLayer } from '../DismissibleLayer';
import { Flex, FlexComponent } from '../Flex';
import { FocusTrap } from '../FocusTrap';
import { Portal } from '../Portal';

import { ModalContext } from './ModalContext';

export interface ModalLayoutProps extends BoxProps {
  labelledBy: string;
  onClose: () => void;
}

const ModalWrapper = styled<FlexComponent>(Flex)`
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
  inset: 0;
`;

export const ModalLayout = ({ onClose, labelledBy, ...props }: ModalLayoutProps) => {
  useLockScroll(true);

  return (
    <Portal>
      <ModalContext.Provider value={onClose}>
        <ModalWrapper justifyContent="center" paddingLeft={8} paddingRight={8} position="fixed" zIndex={4}>
          <FocusTrap>
            <DismissibleLayer onEscapeKeyDown={onClose} onPointerDownOutside={onClose}>
              <Box
                aria-labelledby={labelledBy}
                aria-modal
                onClick={(e) => e.stopPropagation()}
                background="neutral0"
                hasRadius
                role="dialog"
                shadow="popupShadow"
                width="83rem"
                {...props}
              />
            </DismissibleLayer>
          </FocusTrap>
        </ModalWrapper>
      </ModalContext.Provider>
    </Portal>
  );
};
