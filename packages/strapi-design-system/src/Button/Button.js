import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle, getIconPosition } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';

export const ButtonWrapper = styled.button`
  display: flex;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius};
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
  svg {
    height: ${({ theme }) => theme.spaces[3]};
  }
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral0};
    }
  }
  &[aria-disabled='true'] {
    pointer-events: none;
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

export const Button = ({ variant, leftIcon, rightIcon, disabled, children, size, ...props }) => {
  return (
    <ButtonWrapper aria-disabled={disabled} size={size} variant={variant} {...props}>
      {leftIcon && (
        <Box aria-hidden={true} paddingRight={2}>
          {leftIcon}
        </Box>
      )}
      <Text small={size === 'S'} as="span">
        {children}
      </Text>
      {rightIcon && (
        <Box aria-hidden={true} paddingLeft={2}>
          {rightIcon}
        </Box>
      )}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  disabled: false,
  leftIcon: undefined,
  rightIcon: undefined,
  size: 'S',
  variant: 'default',
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  size: PropTypes.oneOf(BUTTON_SIZES),
  variant: PropTypes.oneOf(VARIANTS),
};
