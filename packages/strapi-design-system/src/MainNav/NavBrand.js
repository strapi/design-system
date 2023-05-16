import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

const BrandIconWrapper = styled.div`
  svg,
  img {
    border-radius: ${({ theme }) => theme.borderRadius};
    object-fit: contain;
    height: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
    width: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
  }
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: unset;
`;

export const NavBrand = ({ workplace, title, icon, to }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
        <BrandIconWrapper condensed>
          <NavLink to={to}>
            {icon}
            <VisuallyHidden>
              <span>{title}</span>
              <span>{workplace}</span>
            </VisuallyHidden>
          </NavLink>
        </BrandIconWrapper>
      </Box>
    );
  }

  return (
    <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
      <Flex gap={2}>
        <BrandIconWrapper as={NavLink} to={to} aria-hidden tabIndex={-1}>
          {icon}
        </BrandIconWrapper>

        <Box>
          <Typography fontWeight="bold" textColor="neutral800">
            <NavLinkWrapper color="inherit" to={to}>
              {title}
              <VisuallyHidden>{workplace}</VisuallyHidden>
            </NavLinkWrapper>
          </Typography>
          <Typography variant="pi" as="p" textColor="neutral600" aria-hidden>
            {workplace}
          </Typography>
        </Box>
      </Flex>
    </Box>
  );
};

NavBrand.defaultProps = {
  to: '/',
};
NavBrand.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  workplace: PropTypes.string.isRequired,
};
