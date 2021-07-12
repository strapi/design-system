import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, TextButton } from '../Text';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle, getIconPosition } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';
import { BaseButton } from '../BaseButton';

export const ButtonWrapper = styled(BaseButton)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
  ${Box} {
    display: flex;
    align-items: center;
    margin-top: ${getIconPosition};
  }
  ${Text} {
    color: ${({ theme }) => theme.colors.neutral0};
  }
  &[aria-disabled='true'] {
    ${getDisabledStyle}
    &:active {
      ${getDisabledStyle}
    }
  }
  &:hover {
    ${getHoverStyle}
  }
  &:active {
    ${getActiveStyle}
  }
  ${getVariantStyle}

  box-shadow: ${({ theme, withShadow }) => (withShadow ? theme.shadows.tableShadow : undefined)};
`;

export const Button = React.forwardRef(({ variant, startIcon, endIcon, disabled, children, size, ...props }, ref) => {
  return (
    <ButtonWrapper ref={ref} aria-disabled={disabled} size={size} variant={variant} {...props}>
      {startIcon && (
        <Box aria-hidden={true} paddingRight={2}>
          {startIcon}
        </Box>
      )}

      {size === 's' ? (
        <Text small={size === 'S'} as="span" highlighted>
          {children}
        </Text>
      ) : (
        <TextButton as="span">{children}</TextButton>
      )}

      {endIcon && (
        <Box aria-hidden={true} paddingLeft={2}>
          {endIcon}
        </Box>
      )}
    </ButtonWrapper>
  );
});

Button.displayName = 'Button';

Button.defaultProps = {
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  size: 'S',
  variant: 'default',
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  variant: PropTypes.oneOf(VARIANTS),
};
