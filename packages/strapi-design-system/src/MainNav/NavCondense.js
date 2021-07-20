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
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[1]}`};
  margin: 0;
  width: min-content;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: ${({ theme }) => theme.spaces[2]};
  right: ${({ theme, condensed }) => (condensed ? 0 : theme.spaces[5])};
  transform: ${({ condensed }) => (condensed ? `translateX(50%)` : undefined)};
  z-index: 2;
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
