import React from 'react';

import { NavLink as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

export interface NavLinkProps extends LinkProps {
  badgeAriaLabel: string;
  badgeContent: string | number;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const IconBox = styled(Box)`
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const MainNavLinkWrapper = styled(RouterLink)`
  position: relative;
  text-decoration: none;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${Typography} {
    color: ${({ theme }) => theme.colors.neutral600};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral100};

    ${Typography} {
      color: ${({ theme }) => theme.colors.neutral700};
    }

    svg path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary100};

    svg path {
      fill: ${({ theme }) => theme.colors.primary600};
    }

    ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: 500;
    }
  }
`;

const MainNavRow = styled(Flex)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
`;

const CustomBadge = styled(Badge)<{ condensed?: boolean }>`
  ${({ theme, condensed }) =>
    condensed &&
    `
	  position: absolute;
    // Values based on visual aspect 
    top: -${theme.spaces[3]};
    right:  -${theme.spaces[1]};
  `}

  ${Typography} {
    //find a solution to remove !important
    color: ${({ theme }) => theme.colors.neutral0} !important;
    line-height: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ theme }) => theme.spaces[6]};
  height: ${({ theme }) => theme.spaces[5]};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  border-radius: ${({ theme }) => theme.spaces[10]};
  background: ${({ theme }) => theme.colors.primary600};
`;

export const NavLink = ({ children, icon, badgeContent, badgeAriaLabel, ...props }: NavLinkProps) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <Tooltip position="right" label={children}>
        <MainNavLinkWrapper {...props}>
          <MainNavRow as="span">
            <IconBox aria-hidden paddingRight={0} as="span">
              {icon}
            </IconBox>
            {badgeContent && (
              <CustomBadge condensed aria-label={badgeAriaLabel}>
                {badgeContent}
              </CustomBadge>
            )}
          </MainNavRow>
        </MainNavLinkWrapper>
      </Tooltip>
    );
  }

  return (
    <MainNavLinkWrapper {...props}>
      <MainNavRow as="span" justifyContent="space-between">
        <Flex>
          <IconBox aria-hidden paddingRight={3} as="span">
            {icon}
          </IconBox>
          <Typography>{children}</Typography>
        </Flex>
        {badgeContent && (
          <CustomBadge justifyContent="center" aria-label={badgeAriaLabel}>
            {badgeContent}
          </CustomBadge>
        )}
      </MainNavRow>
    </MainNavLinkWrapper>
  );
};
