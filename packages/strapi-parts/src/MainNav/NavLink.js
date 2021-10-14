import PropTypes from 'prop-types';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import { useMainNav } from './MainNavContext';

const IconBox = styled(Box)`
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// TODO: make sure to use the Link component associated with the router we want to use
const MainNavLinkWrapper = styled(RouterLink)`
  position: relative;
  text-decoration: none;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${Text} {
    color: ${({ theme }) => theme.colors.neutral600};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral100};

    ${Text} {
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

    ${Text} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: 500;
    }
  }
`;

const MainNavRow = styled(Row)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
`;

const CustomBadge = styled(Badge)`
  ${({ condensed }) =>
    condensed &&
    `
	  position: absolute;
    transform: translate(35%, -50%);
    top: 0;
    right: 0;
  `}

  ${Text} {
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
      <li>
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
      </li>
    );
  }

  return (
    <li>
      <MainNavLinkWrapper {...props}>
        <MainNavRow as="span" justifyContent="space-between">
          <Row>
            <IconBox aria-hidden paddingRight={3} as="span">
              {icon}
            </IconBox>
            <Text>{children}</Text>
          </Row>
          {badgeContent && (
            <CustomBadge justifyContent="center" aria-label={badgeAriaLabel}>
              {badgeContent}
            </CustomBadge>
          )}
        </MainNavRow>
      </MainNavLinkWrapper>
    </li>
  );
};

NavLink.defaultProps = {
  badgeContent: undefined,
  badgeAriaLabel: undefined,
};

NavLink.propTypes = {
  badgeAriaLabel: PropTypes.string,
  badgeContent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
