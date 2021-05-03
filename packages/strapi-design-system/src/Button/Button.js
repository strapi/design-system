import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle, getBoxPosition } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';

export const ButtonStyle = styled.button`
  display: flex;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
  ${Box} {
    display: flex;
    align-items: center;
    margin-top: ${getBoxPosition};
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
  &:disabled {
    ${getDisabledStyle}
    &:hover {
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

export const Button = ({ variant, leftIcon, rightIcon, children, size, ...props }) => {
  return (
    <ButtonStyle size={size} variant={variant} {...props}>
      {leftIcon && <Box paddingRight={2}>{leftIcon}</Box>}
      <Text small={size === 'S'}>{children}</Text>
      {rightIcon && <Box paddingLeft={2}>{rightIcon}</Box>}
    </ButtonStyle>
  );
};

Button.defaultProps = {
  variant: 'default',
  rightIcon: undefined,
  leftIcon: undefined,
  size: 'S',
};
Button.propTypes = {
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(VARIANTS),
  size: PropTypes.oneOf(BUTTON_SIZES),
};
