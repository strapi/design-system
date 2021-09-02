import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BackFilter from '@strapi/icons/BackFilter';
import NextFilter from '@strapi/icons/NextFilter';
import { NavLink } from 'react-router-dom';
import { VisuallyHidden } from '../VisuallyHidden';
import { usePagination } from './PaginationContext';
import { Text } from '../Text';

const PaginationText = styled(Text)`
  line-height: revert;
`;

const transientProps = {
  active: true,
};

// TODO: make sure to use the Link exposed by the chosen router
const LinkWrapper = styled(NavLink).withConfig({
  shouldForwardProp: (prop, defPropValFN) => !transientProps[prop] && defPropValFN(prop),
})`
  padding: ${({ theme }) => theme.spaces[3]};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ active, theme }) => (active ? theme.shadows.filterShadow : undefined)};
  text-decoration: none;
  display: flex;
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

export const PreviousLink = ({ children, to, ...props }) => {
  const { activePage } = usePagination();

  const disabled = activePage === 1;

  return (
    <li>
      <ActionLinkWrapper
        to={disabled ? '#' : to}
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

export const NextLink = ({ children, to, ...props }) => {
  const { activePage, pageCount } = usePagination();

  const disabled = activePage === pageCount;

  return (
    <li>
      <ActionLinkWrapper
        to={disabled ? '#' : to}
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
      <PageLinkWrapper {...props} active={isActive}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <PaginationText aria-hidden={true} small={true} bold={isActive}>
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
  to: PropTypes.string.isRequired,
};

NextLink.propTypes = sharedPropTypes;
PreviousLink.propTypes = sharedPropTypes;

Dots.propTypes = {
  children: PropTypes.node.isRequired,
};
