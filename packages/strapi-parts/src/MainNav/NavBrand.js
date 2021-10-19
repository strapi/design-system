import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box } from '../Box';
import { P, ButtonText } from '../Text';
import { Flex } from '../Flex';
import { useMainNav } from './MainNavContext';
import { VisuallyHidden } from '../VisuallyHidden';

const BrandIconWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};

  svg,
  img {
    height: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
    width: ${({ condensed }) => (condensed ? `${40 / 16}rem` : `${32 / 16}rem`)};
  }
`;

const NavLinkWrapper = styled(NavLink)`
  text-decoration: unset;
  color: inherit;
`;

export const NavBrand = ({ workplace, title, icon, to }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Box paddingLeft={3} paddingRight={3} paddingTop={4} paddingBottom={4}>
        <BrandIconWrapper condensed={true}>
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
          <ButtonText textColor="neutral800" as="span">
            <NavLinkWrapper to={to}>
              {title}
              <VisuallyHidden as="span">{workplace}</VisuallyHidden>
            </NavLinkWrapper>
          </ButtonText>
          <P small textColor="neutral600" aria-hidden>
            {workplace}
          </P>
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
