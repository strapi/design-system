import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
/** TODO: make sure to use the react component when they are available in strapi-icons */
import prevLink from './assets/previous.svg';
import nextLink from './assets/next.svg';
import { VisuallyHidden } from '../VisuallyHidden';
import { useActivePage } from './PaginationContext';
import { Text } from '../Text';

// TODO: make sure to use the Link exposed by the chosen router
const Wrapper = styled.a`
  padding: ${({ theme }) => theme.spaces[3]};
  background: ${({ theme, active }) => (active ? theme.colors.neutral0 : theme.colors.neutral100)};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme, active }) => (active ? theme.colors.primary600 : theme.colors.neutral800)};
  box-shadow: ${({ active }) => (active ? `0px 1px 4px rgba(26, 26, 67, 0.1)` : undefined)};
  text-decoration: none;
  display: flex;
`;

const PaginationText = styled(Text)`
  line-height: revert;
`;

export const PreviousLink = ({ children, ...props }) => (
  <li>
    <Wrapper {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <img src={prevLink} aria-hidden={true} />
    </Wrapper>
  </li>
);

export const NextLink = ({ children, ...props }) => (
  <li>
    <Wrapper {...props}>
      <VisuallyHidden>{children}</VisuallyHidden>
      <img src={nextLink} aria-hidden={true} />
    </Wrapper>
  </li>
);

export const PageLink = ({ number, children, ...props }) => {
  const activePage = useActivePage();

  const isActive = activePage === number;

  return (
    <li>
      <Wrapper {...props} active={isActive} aria-current={isActive}>
        <VisuallyHidden>{children}</VisuallyHidden>
        <PaginationText aria-hidden={true} small={true} highlighted={isActive}>
          {number}
        </PaginationText>
      </Wrapper>
    </li>
  );
};

export const Dots = ({ children, ...props }) => (
  <li>
    <Wrapper {...props} as="div">
      <VisuallyHidden>{children}</VisuallyHidden>
      <PaginationText aria-hidden={true} small={true}>
        …
      </PaginationText>
    </Wrapper>
  </li>
);

PageLink.propTypes = {
  children: PropTypes.node.isRequired,
  number: PropTypes.number.isRequired,
};

const sharedPropTypes = {
  children: PropTypes.node.isRequired,
};

Dots.propTypes = sharedPropTypes;
NextLink.propTypes = sharedPropTypes;
PreviousLink.propTypes = sharedPropTypes;
