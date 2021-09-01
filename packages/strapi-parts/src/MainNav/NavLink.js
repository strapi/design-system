import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import { useMainNav } from './MainNavContext';
import { Tooltip } from '../Tooltip';

const IconBox = styled(Box)`
  height: 1rem;
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

const Notification = styled(Row)`
  //positionning when condensed
  position: ${(props) => (props.condensed ? 'absolute' : '')};
  transform: ${(props) => (props.condensed ? 'translate(35%, -50%)' : '')};
  top: ${(props) => (props.condensed ? '0' : '')};
  right: ${(props) => (props.condensed ? '0' : '')};

  background: ${({ theme }) => theme.colors.primary600};
  height: ${({ theme }) => theme.spaces[5]};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  border-radius: ${({ theme }) => theme.spaces[10]};

  ${Text} {
    color: ${({ theme }) => theme.colors.neutral0} !important;
    line-height: 0;
  }
`;

export const NavLink = ({ children, icon, notifications, ...props }) => {
  const condensed = useMainNav();
  const isNotification = notifications > 0;

  if (condensed) {
    return (
      <li>
        <Tooltip position="right" label={children}>
          <MainNavLinkWrapper {...props}>
            <MainNavRow as="span">
              <IconBox aria-hidden paddingRight={0} as="span">
                {icon}
              </IconBox>
              {isNotification && (
                <Notification condensed justifyContent="center">
                  <Text notifText small highlighted>
                    {notifications}
                  </Text>
                </Notification>
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
          {isNotification && (
            <Notification justifyContent="center">
              <Text notifText small highlighted>
                {notifications}
              </Text>
            </Notification>
          )}
        </MainNavRow>
      </MainNavLinkWrapper>
    </li>
  );
};

NavLink.defaultProps = {
  notifications: undefined,
};

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  notifications: PropTypes.number,
};
