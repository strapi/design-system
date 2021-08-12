import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, TextButton } from '../Text';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';
import { BaseButton } from '../BaseButton';

// TODO: Check the L size button with Maeva
export const ButtonWrapper = styled(BaseButton)`
  padding: ${({ theme, size }) => `${size === 'S' ? theme.spaces[2] : '10px'} ${theme.spaces[4]}`};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
  ${Box} {
    display: flex;
    align-items: center;
    margin-top: 2px;
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
`;

export const Button = React.forwardRef(
  ({ variant, startIcon, endIcon, disabled, children, onClick, size, ...props }, ref) => {
    const handleClick = (e) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    };

    return (
      <ButtonWrapper ref={ref} aria-disabled={disabled} size={size} variant={variant} onClick={handleClick} {...props}>
        {startIcon && (
          <Box aria-hidden={true} paddingRight={2}>
            {startIcon}
          </Box>
        )}

        {size === 'S' ? (
          <Text small={size === 'S'} highlighted>
            {children}
          </Text>
        ) : (
          <TextButton>{children}</TextButton>
        )}

        {endIcon && (
          <Box aria-hidden={true} paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';

Button.defaultProps = {
  disabled: false,
  startIcon: undefined,
  endIcon: undefined,
  size: 'S',
  variant: 'default',
  onClick: undefined,
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  variant: PropTypes.oneOf(VARIANTS),
};
