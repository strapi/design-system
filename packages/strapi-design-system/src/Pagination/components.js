import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChevronLeft from '@strapi/icons/ChevronLeft';
import ChevronRight from '@strapi/icons/ChevronRight';
import { VisuallyHidden } from '../VisuallyHidden';
import { usePagination } from './PaginationContext';
import { Typography } from '../Typography';
import { buttonFocusStyle } from '../themes/utils';
import { BaseLink } from '../BaseLink';

const PaginationText = styled(Typography)`
  line-height: revert;
`;

const transientProps = {
  active: true,
};

const LinkWrapper = styled(BaseLink).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ active, theme }) => (active ? theme.shadows.filterShadow : undefined)};
  text-decoration: none;
  display: flex;

  ${buttonFocusStyle}
`;

const PageLinkWrapper = styled(LinkWrapper)`
  color: ${({ theme, active }) => (active ? theme.colors.primary700 : theme.colors.neutral800)};
  background: ${({ theme, active }) => (active ? theme.colors.neutral0 : undefined)};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  }
`;

const ActionLinkWrapper = styled(LinkWrapper)`
  font-size: 0.7rem;
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

const DotsWrapper = styled(LinkWrapper)`
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const PreviousLink = ({ children, ...props }) => {
  const { activePage } = usePagination();

  const disabled = activePage === 1;

  return (
    <ActionLinkWrapper aria-disabled={disabled} tabIndex={disabled ? -1 : undefined} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <ChevronLeft aria-hidden={true} />
    </ActionLinkWrapper>
  );
};

export const NextLink = ({ children, ...props }) => {
  const { activePage, pageCount } = usePagination();

  const disabled = activePage === pageCount;

  return (
    <ActionLinkWrapper aria-disabled={disabled} tabIndex={disabled ? -1 : undefined} {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <ChevronRight aria-hidden={true} />
    </ActionLinkWrapper>
  );
};

export const PageLink = ({ number, children, ...props }) => {
  const { activePage } = usePagination();

  const isActive = activePage === number;

  return (
    <PageLinkWrapper {...props} active={isActive}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <PaginationText aria-hidden={true} variant="pi" fontWeight={isActive ? 'bold' : null}>
        {number}
      </PaginationText>
    </PageLinkWrapper>
  );
};

export const Dots = ({ children, ...props }) => (
  <DotsWrapper {...props} as="div">
    <VisuallyHidden>{children}</VisuallyHidden>
    <PaginationText aria-hidden={true} variant="pi">
      …
    </PaginationText>
  </DotsWrapper>
);

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired,
};

const sharedPropTypes = {
  children: PropTypes.node.isRequired,
};

NextLink.propTypes = sharedPropTypes;
PreviousLink.propTypes = sharedPropTypes;

Dots.propTypes = {
  children: PropTypes.node.isRequired,
};
