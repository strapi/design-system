import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BackFilter, NextFilter } from '@strapi/icons';
import { VisuallyHidden } from '../VisuallyHidden';
import { usePagination } from './PaginationContext';
import { Text } from '../Text';

const PaginationText = styled(Text)`
  line-height: revert;
`;

// TODO: make sure to use the Link exposed by the chosen router
const LinkWrapper = styled.a`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  // TODO: make sure to use the one from the theme
  box-shadow: ${({ active }) => (active ? `0px 1px 4px rgba(26, 26, 67, 0.1)` : undefined)};
  text-decoration: none;
  display: flex;
`;

const PageLinkWrapper = styled(LinkWrapper)`
  color: ${({ theme, active }) => (active ? theme.colors.primary700 : theme.colors.neutral800)};
  background: ${({ theme, active }) => (active ? theme.colors.neutral0 : undefined)};

  &:hover {
    box-shadow: 0px 1px 4px rgba(26, 26, 67, 0.1);
  }
`;

const ActionLinkWrapper = styled(LinkWrapper)`
  font-size: 0.7rem;
  svg path {
    fill: ${(p) => (p['aria-disabled'] ? p.theme.colors.neutral300 : p.theme.colors.neutral500)};
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

export const PreviousLink = ({ children, href, ...props }) => {
  const { activePage } = usePagination();

  const disabled = activePage === 1;

  return (
    <li>
      <ActionLinkWrapper
        href={disabled ? '#' : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        <VisuallyHidden>{children}</VisuallyHidden>
        <BackFilter aria-hidden={true} />
      </ActionLinkWrapper>
    </li>
  );
};

export const NextLink = ({ children, href, ...props }) => {
  const { activePage, pageCount } = usePagination();

  const disabled = activePage === pageCount;

  return (
    <li>
      <ActionLinkWrapper
        href={disabled ? '#' : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        <VisuallyHidden>{children}</VisuallyHidden>
        <NextFilter aria-hidden={true} />
      </ActionLinkWrapper>
    </li>
  );
};

export const PageLink = ({ number, children, ...props }) => {
  const { activePage } = usePagination();

  const isActive = activePage === number;

  return (
    <li>
      <PageLinkWrapper {...props} active={isActive} aria-current={isActive}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <PaginationText aria-hidden={true} small={true} highlighted={isActive}>
          {number}
        </PaginationText>
      </PageLinkWrapper>
    </li>
  );
};

export const Dots = ({ children, ...props }) => (
  <li>
    <DotsWrapper {...props} as="div">
      <VisuallyHidden>{children}</VisuallyHidden>
      <PaginationText aria-hidden={true} small={true}>
        …
      </PaginationText>
    </DotsWrapper>
  </li>
);

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired,
};

const sharedPropTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

NextLink.propTypes = sharedPropTypes;
PreviousLink.propTypes = sharedPropTypes;

Dots.propTypes = {
  children: PropTypes.node.isRequired,
};
