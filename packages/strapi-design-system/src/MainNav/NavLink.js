import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import { useMainNav } from './MainNavContext';
import { Tooltip } from '../Tooltip';

const IconBox = styled(Box)`
  height: 1rem;
`;

// TODO: make sure to use the Link component associated with the router we want to use
const MainNavLinkWrapper = styled.a`
  text-decoration: none;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme, active }) => (active ? theme.colors.primary100 : theme.colors.neutral0)};

  svg path {
    fill: ${({ theme, active }) => (active ? theme.colors.primary600 : theme.colors.neutral500)};
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
`;

const MainNavRow = styled(Row)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
`;

export const NavLink = ({ children, icon, active, ...props }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <li>
        <Tooltip position="right" label={children}>
          <MainNavLinkWrapper {...props} active={active} aria-current={active}>
            <MainNavRow as="span">
              <IconBox aria-hidden paddingRight={0} as="span">
                {icon}
              </IconBox>
            </MainNavRow>
          </MainNavLinkWrapper>
        </Tooltip>
      </li>
    );
  }

  return (
    <li>
      <MainNavLinkWrapper {...props} active={active} aria-current={active}>
        <MainNavRow as="span">
          <IconBox aria-hidden paddingRight={3} as="span">
            {icon}
          </IconBox>

          <Text textColor={active ? 'primary600' : 'neutral600'} highlighted={active}>
            {children}
          </Text>
        </MainNavRow>
      </MainNavLinkWrapper>
    </li>
  );
};

NavLink.defaultProps = {
  active: false,
};

NavLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};
