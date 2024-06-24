import * as React from 'react';

import { ChevronLeft, ChevronRight } from '@strapi/icons';
import { styled } from 'styled-components';

import { focus } from '../../styles/buttons';
import { PolymorphicRef } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';
import { BaseLink, BaseLinkComponent, BaseLinkProps } from '../BaseLink';
import { Box, BoxProps } from '../Box';
import { Typography } from '../Typography';

import { usePagination } from './PaginationContext';

/* -------------------------------------------------------------------------------------------------
 * Next/Prev/Links
 * -----------------------------------------------------------------------------------------------*/

type PaginationLinkProps<C extends React.ElementType = 'a'> = BaseLinkProps<C>;

const PreviousLink = forwardRef(
  <C extends React.ElementType = 'a'>({ children, ...props }: PaginationLinkProps<C>, ref: PolymorphicRef<C>) => {
    const { activePage } = usePagination();

    const disabled = activePage === 1;

    return (
      <ActionLinkWrapper ref={ref} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined} {...props}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <ChevronLeft aria-hidden />
      </ActionLinkWrapper>
    );
  },
);

type PreviousLinkComponent<C extends React.ElementType = 'a'> = (props: PaginationLinkProps<C>) => React.ReactNode;

const NextLink = forwardRef(
  <C extends React.ElementType = 'a'>({ children, ...props }: PaginationLinkProps<C>, ref: PolymorphicRef<C>) => {
    const { activePage, pageCount } = usePagination();

    const disabled = activePage === pageCount;

    return (
      <ActionLinkWrapper ref={ref} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined} {...props}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <ChevronRight aria-hidden />
      </ActionLinkWrapper>
    );
  },
);

type NextLinkComponent<C extends React.ElementType = 'a'> = (props: PaginationLinkProps<C>) => React.ReactNode;

const LinkWrapper = styled<BaseLinkComponent>(BaseLink)<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.filterShadow : undefined)};
  text-decoration: none;
  display: flex;

  ${focus}
`;

const ActionLinkWrapper = styled(LinkWrapper)`
  font-size: 1.1rem;

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

/* -------------------------------------------------------------------------------------------------
 * PageLink
 * -----------------------------------------------------------------------------------------------*/

type PaginationPageLinkProps<C extends React.ElementType = 'a'> = PaginationLinkProps<C> & {
  number: number;
};

const PageLink = forwardRef(
  <C extends React.ElementType = 'a'>(
    { number, children, ...props }: PaginationPageLinkProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const { activePage } = usePagination();

    const isActive = activePage === number;

    return (
      <PageLinkWrapper ref={ref} {...props} aria-current={isActive} $active={isActive}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <Typography aria-hidden fontWeight={isActive ? 'bold' : undefined} lineHeight="revert" variant="pi">
          {number}
        </Typography>
      </PageLinkWrapper>
    );
  },
);

type PageLinkComponent<C extends React.ElementType = 'a'> = (props: PaginationPageLinkProps<C>) => React.ReactNode;

const PageLinkWrapper = styled(LinkWrapper)<{ $active?: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary700 : theme.colors.neutral800)};
  background: ${({ theme, $active }) => ($active ? theme.colors.neutral0 : undefined)};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Dots
 * -----------------------------------------------------------------------------------------------*/

interface DotsProps extends BoxProps {}

const Dots = ({ children, ...props }: DotsProps) => (
  <Box {...props}>
    <VisuallyHidden>{children}</VisuallyHidden>
    <Typography aria-hidden lineHeight="revert" textColor="neutral800" variant="pi">
      …
    </Typography>
  </Box>
);

export { Dots, NextLink, PageLink, PreviousLink };
export type {
  PaginationLinkProps,
  PaginationPageLinkProps,
  DotsProps,
  PageLinkComponent,
  PreviousLinkComponent,
  NextLinkComponent,
};
