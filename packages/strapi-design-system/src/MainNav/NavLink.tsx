import * as React from 'react';

import styled, { css } from 'styled-components';

import { useMainNav } from './MainNavContext';
import { Badge } from '../Badge';
import { BaseLink, BaseLinkProps } from '../BaseLink';
import { Box } from '../Box';
import { Flex, FlexComponent } from '../Flex';
import { Tooltip } from '../Tooltip';
import { Typography } from '../Typography';

const MainNavLinkWrapper = styled(BaseLink)`
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

const MainNavRow = styled<FlexComponent<'span'>>(Flex)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
`;

const CustomBadge = styled(Badge)<{ $condensed?: boolean }>`
  ${({ theme, $condensed }) =>
    $condensed &&
    css`
      position: absolute;
      // Values based on visual aspect
      top: -${theme.spaces[3]};
      right: -${theme.spaces[1]};
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

export interface NavLinkProps extends BaseLinkProps {
  badgeAriaLabel?: string;
  badgeContent?: string | number;
  children: string;
  icon: React.ReactNode;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ children, icon, badgeContent, badgeAriaLabel, ...props }, ref) => {
    const condensed = useMainNav();

    if (condensed) {
      return (
        <MainNavLinkWrapper ref={ref} {...props}>
          <Tooltip position="right" label={children}>
            <MainNavRow tag="span" justifyContent="center">
              <Box aria-hidden paddingRight={0} tag="span">
                {icon}
              </Box>
              {badgeContent && (
                <CustomBadge condensed aria-label={badgeAriaLabel}>
                  {badgeContent}
                </CustomBadge>
              )}
            </MainNavRow>
          </Tooltip>
        </MainNavLinkWrapper>
      );
    }

    return (
      <MainNavLinkWrapper ref={ref} {...props}>
        <MainNavRow tag="span" justifyContent="space-between">
          <Flex>
            <Box aria-hidden paddingRight={3} tag="span">
              {icon}
            </Box>
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
  },
);
