import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NextFilter from '@strapi/icons/NextFilter';
import BackFilter from '@strapi/icons/BackFilter';
import { VisuallyHidden } from '../VisuallyHidden';
import { useMainNav } from './MainNavContext';

const NavCondenseWrapper = styled.button`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${(9 + 4) / 16}rem; // 9 is the height of the svg and 4 is the padding below
  right: ${({ theme, condensed }) => (condensed ? 0 : theme.spaces[5])};
  transform: ${({ condensed }) => (condensed ? `translateX(50%)` : undefined)};
  z-index: 2;
  width: ${18 / 16}rem;
  height: ${25 / 16}rem;

  svg {
    width: ${6 / 16}rem;
    height: ${9 / 16}rem;
  }
`;

export const NavCondense = ({ children, ...props }) => {
  const condensed = useMainNav();

  return (
    <NavCondenseWrapper as="button" condensed={condensed} {...props}>
      {condensed ? <NextFilter aria-hidden /> : <BackFilter aria-hidden />}
      <VisuallyHidden>{children}</VisuallyHidden>
    </NavCondenseWrapper>
  );
};

NavCondense.propTypes = {
  children: PropTypes.string.isRequired,
};
