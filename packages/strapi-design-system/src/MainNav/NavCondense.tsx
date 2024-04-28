import { ChevronRight, ChevronLeft } from '@strapi/icons';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Flex, FlexComponent, FlexProps } from '../Flex';
import { VisuallyHidden } from '../VisuallyHidden';

export interface NavCondenseProps extends FlexProps<'button'> {
  children: string;
}

export const NavCondense = ({ children, ...props }: NavCondenseProps) => {
  const condensed = useMainNav();

  const Icon = condensed ? ChevronRight : ChevronLeft;

  return (
    <NavCondenseWrapper tag="button" $condensed={condensed} {...props}>
      <Icon width="1.2rem" aria-hidden fill="neutral600" />
      <VisuallyHidden>{children}</VisuallyHidden>
    </NavCondenseWrapper>
  );
};

const NavCondenseWrapper = styled<FlexComponent>(Flex).attrs<FlexProps<'button'>>((props) => ({
  justifyContent: 'center',
  ...props,
}))<{ $condensed: boolean }>`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: absolute;
  bottom: 1.3rem; // 9 is the height of the svg and 4 is the padding below
  right: ${({ theme, $condensed }) => ($condensed ? 0 : theme.spaces[5])};
  transform: ${({ $condensed }) => ($condensed ? `translateX(50%)` : undefined)};
  z-index: 2;
  width: 1.8rem;
  height: 2.5rem;
`;
