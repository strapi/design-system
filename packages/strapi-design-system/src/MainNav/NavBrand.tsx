import React from 'react';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';

export interface NavBrandProps {
  icon?: React.ReactNode;
  title: string;
  to?: string;
  workplace: string;
}

const BrandIconWrapper = styled.div<{ condensed?: boolean }>`
  svg,
  img {
    border-radius: ${({ theme }) => theme.borderRadius};
    object-fit: contain;
    height: ${({ condensed }) => (condensed ? `4rem` : `3.2rem`)};
    width: ${({ condensed }) => (condensed ? `4rem` : `3.2rem`)};
  }
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: unset;
  color: inherit;
`;

export const NavBrand = ({ workplace, title, icon, to = '/' }: NavBrandProps) => {
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
      <Flex>
        <BrandIconWrapper as={NavLink} to={to} aria-hidden tabIndex={-1}>
          {icon}
        </BrandIconWrapper>

        <Box paddingLeft={2}>
          <Typography fontWeight="bold" textColor="neutral800" as="span">
            <NavLinkWrapper to={to}>
              {title}
              <VisuallyHidden as="span">{workplace}</VisuallyHidden>
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
