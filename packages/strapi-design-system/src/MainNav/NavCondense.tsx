import React from 'react';

import { ChevronRight, ChevronLeft } from '@strapi/icons';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';

export interface NavCondenseWrapperProps {
  children: React.ReactNode;
}

interface NavCondenseWrapperButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  condensed?: boolean;
}

const NavCondenseWrapper = styled.button<NavCondenseWrapperButtonProps>`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 1.3rem;
  right: ${({ theme, condensed }) => (condensed ? 0 : theme.spaces[5])};
  transform: ${({ condensed }) => (condensed ? `translateX(50%)` : undefined)};
  z-index: 2;
  width: 1.8rem;
  height: 2.5rem;

  svg {
    width: 0.6rem;
    height: 0.9rem;
  }
`;

export const NavCondense = ({ children, ...props }: NavCondenseWrapperProps) => {
  const condensed = useMainNav();

  return (
    <NavCondenseWrapper as="button" condensed={condensed} {...props}>
      <Icon as={condensed ? ChevronRight : ChevronLeft} aria-hidden color="neutral600" />
      <VisuallyHidden>{children}</VisuallyHidden>
    </NavCondenseWrapper>
  );
};
