import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BaseLink } from '../BaseLink';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';
import { buttonFocusStyle } from '../themes/utils';

const SimpleNavItemWrapper = styled(Box)`
  text-decoration: none;
  background: ${({ background, theme }) => theme.colors[background] || background};
  color: ${({ textColor, theme, withError }) => theme.colors[withError ? 'danger600' : textColor]};

  &.active,
  &:active,
  &[aria-current='page'] {
    background: ${({ theme, withError }) => theme.colors[withError ? 'danger100' : 'primary100']};
    color: ${({ theme, withError }) => theme.colors[withError ? 'danger600' : 'primary700']};
  }

  &:not(.active):not(:active):not([aria-current='page']) {
    &:hover {
      background: ${({ theme, withError }) => theme.colors[withError ? 'danger100' : 'neutral150']};
      color: ${({ theme, withError }) => theme.colors[withError ? 'danger600' : 'neutral800']};
    }
  }

  svg,
  svg * {
    fill: currentColor;
  }

  ${buttonFocusStyle}
`;

const SimpleNavItemIconWrapper = (props) => <Flex as="span" alignItems="center" aria-hidden="true" {...props} />;

export const SimpleNavItem = ({
  children,
  className,
  endIcon,
  gap,
  isActive,
  startIcon,
  textVariant,
  withError,
  ...rest
}) => {
  return (
    <SimpleNavItemWrapper className={`${className}${!isActive ? '' : ' active'}`} withError={withError} {...rest}>
      <Typography variant={textVariant} textColor="currentColor">
        <Flex as="span" display="flex" alignItems="center" justifyContent="space-around" gap={gap} width="100%">
          {startIcon && <SimpleNavItemIconWrapper>{startIcon}</SimpleNavItemIconWrapper>}
          <Flex as="span" flex="1 auto">
            {children}
          </Flex>
          {endIcon && <SimpleNavItemIconWrapper>{endIcon}</SimpleNavItemIconWrapper>}
        </Flex>
      </Typography>
    </SimpleNavItemWrapper>
  );
};

SimpleNavItem.defaultProps = {
  ...Box.defaultProps,
  as: BaseLink,
  endIcon: undefined,
  background: 'transparent',
  cursor: 'pointer',
  flex: '1 1 0%',
  gap: 2,
  hasRadius: true,
  isActive: false,
  kind: undefined,
  paddingTop: 2,
  paddingRight: 4,
  paddingBottom: 2,
  paddingLeft: 4,
  startIcon: undefined,
  textColor: 'neutral600',
  textVariant: 'omega',
  transition: 'all 0.2s linear',
  withError: false,
};

SimpleNavItem.propTypes = {
  ...Box.propTypes,
  endIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  isActive: PropTypes.bool,
  kind: PropTypes.oneOf(['active', 'error']),
  startIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  withError: PropTypes.bool,
};
