import React from 'react';

import { ChevronLeft, ChevronRight } from '@strapi/icons';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { usePagination } from './PaginationContext';
import { Box, BoxProps } from '../Box';
import { buttonFocusStyle } from '../themes/utils';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

interface PaginationLinkProps extends NavLinkProps {
  active: boolean;
  children: React.ReactNode;
}

interface PaginationPageLinkProps extends PaginationLinkProps {
  number: number;
}

interface DotsProps extends BoxProps {}

const transientProps = {
  active: true,
};

const LinkWrapper = styled(NavLink).withConfig<PaginationLinkProps>({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ active, theme }) => (active ? theme.shadows.filterShadow : undefined)};
  text-decoration: none;
  display: flex;

  ${buttonFocusStyle}
`;

const PageLinkWrapper = styled(LinkWrapper)<PaginationLinkProps>`
  color: ${({ theme, active }) => (active ? theme.colors.primary700 : theme.colors.neutral800)};
  background: ${({ theme, active }) => (active ? theme.colors.neutral0 : undefined)};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  }
`;

const ActionLinkWrapper = styled(LinkWrapper)<PaginationLinkProps>`
  font-size: ${11 / 16}rem;

  svg path {
    fill: ${(p) => (p['aria-disabled'] ? p.theme.colors.neutral300 : p.theme.colors.neutral600)};
  }

  &:focus,
  &:hover {
    svg path {
      fill: ${(p) => (p['aria-disabled'] ? p.theme.colors.neutral300 : p.theme.colors.neutral700)};
    }
  }

  ${(p) =>
    p['aria-disabled']
      ? `
  pointer-events: none;
    `
      : undefined}
`;

export const PreviousLink = ({ children, to, ...props }: PaginationLinkProps) => {
  const { activePage } = usePagination();

  const disabled = activePage === 1;

  return (
    <ActionLinkWrapper
      to={disabled ? '#' : to}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
      <ChevronLeft aria-hidden />
    </ActionLinkWrapper>
  );
};

PreviousLink.displayName = 'PreviousLink';

export const NextLink = ({ children, to, ...props }: PaginationLinkProps) => {
  const { activePage, pageCount } = usePagination();

  const disabled = activePage === pageCount;

  return (
    <ActionLinkWrapper
      to={disabled ? '#' : to}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      <VisuallyHidden>{children}</VisuallyHidden>
      <ChevronRight aria-hidden />
    </ActionLinkWrapper>
  );
};

NextLink.displayName = 'NextLink';

export const PageLink = ({ number, children, ...props }: PaginationPageLinkProps) => {
  const { activePage } = usePagination();

  const isActive = activePage === number;

  return (
    <PageLinkWrapper {...props} active={isActive}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <Typography aria-hidden fontWeight={isActive ? 'bold' : undefined} lineHeight="revert" variant="pi">
        {number}
      </Typography>
    </PageLinkWrapper>
  );
};

PageLink.displayName = 'PageLink';

export const Dots = ({ children, ...props }: DotsProps) => (
  <Box {...props}>
    <VisuallyHidden>{children}</VisuallyHidden>
    <Typography aria-hidden lineHeight="revert" textColor="neutral800" variant="pi">
      …
    </Typography>
  </Box>
);
