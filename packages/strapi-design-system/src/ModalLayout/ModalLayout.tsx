import styled from 'styled-components';

import { ModalContext } from './ModalContext';
import { Box, BoxProps } from '../Box';
import { DismissibleLayer } from '../DismissibleLayer';
import { Flex } from '../Flex';
import { FocusTrap } from '../FocusTrap';
import useLockScroll from '../hooks/useLockScroll';
import { Portal } from '../Portal';

export interface ModalLayoutProps extends BoxProps {
  labelledBy: string;
  onClose: () => void;
}

const ModalWrapper = styled(Flex)`
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
  inset: 0;
`;

export const ModalLayout = ({ onClose, labelledBy, ...props }: ModalLayoutProps) => {
  useLockScroll(true);

  return (
    <Portal>
      <ModalContext.Provider value={onClose}>
        <ModalWrapper justifyContent="center" paddingLeft={8} paddingRight={8} position="fixed" zIndex={10}>
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
                width={`${830 / 16}rem`}
                {...props}
              />
            </DismissibleLayer>
          </FocusTrap>
        </ModalWrapper>
      </ModalContext.Provider>
    </Portal>
  );
};
