import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { useMainNav } from './MainNavContext';
import { Tooltip } from '../Tooltip';
import { Badge } from '../Badge';

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

const CustomBadge = styled(Badge)`
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

export const NavLink = ({ children, icon, badgeContent, badgeAriaLabel, ...props }) => {
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

NavLink.displayName = 'NavLink';

NavLink.defaultProps = {
  badgeContent: undefined,
  badgeAriaLabel: undefined,
};

NavLink.propTypes = {
  badgeAriaLabel: PropTypes.string,
  badgeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};
