import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Bullet from '@strapi/icons/Bullet';
import { NavLink } from 'react-router-dom';
import { Box } from '../Box';
import { Text } from '../Text';
import { Flex } from '../Flex';

const SubNavLinkWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.neutral800};
  svg > * {
    fill: ${({ theme }) => theme.colors.neutral600};
  }

  &.active {
    ${({ theme }) => {
      return `
      background-color: ${theme.colors.primary100};
      border-right: 2px solid ${theme.colors.primary600};
      svg > * {
        fill: ${theme.colors.primary700};
      }
      ${Text} {
        color: ${theme.colors.primary700};
        font-weight: 500;
      }
      `;
    }}
  }

  &:focus-visible {
    outline-offset: -2px;
  }
`;
const CustomBullet = styled(Bullet)`
  width: ${12 / 16}rem;
  height: ${4 / 16}rem;
  * {
    fill: ${({ theme, $active }) => ($active ? theme.colors.primary600 : theme.colors.neutral600)};
  }
`;
const IconWrapper = styled.div`
  svg {
    height: ${12 / 16}rem;
    width: ${12 / 16}rem;
  }
`;

export const SubNavLink = ({ children, icon, withBullet, ...props }) => {
  return (
    <li>
      <SubNavLinkWrapper
        as={NavLink}
        icon={icon}
        background="neutral100"
        paddingLeft={7}
        paddingBottom={2}
        paddingTop={2}
        {...props}
      >
        <Flex>
          {icon ? <IconWrapper>{icon}</IconWrapper> : <CustomBullet />}
          <Box paddingLeft={2}>
            <Text as="span">{children}</Text>
          </Box>
        </Flex>
        {withBullet && (
          <Box as={Flex} paddingRight={4}>
            <CustomBullet $active={true} />
          </Box>
        )}
      </SubNavLinkWrapper>
    </li>
  );
};

SubNavLink.defaultProps = {
  icon: null,
  withBullet: false,
};
SubNavLink.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.element,
  link: PropTypes.element,
  withBullet: PropTypes.bool,
};
