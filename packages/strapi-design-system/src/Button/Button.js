import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';

export const ButtonStyle = styled.button`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[4]}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
  ${Text} {
    color: ${({ theme }) => theme.colors.neutral0};
  }
  > svg {
    fill: ${({ theme }) => theme.colors.neutral0};
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
    <ButtonStyle variant={variant} {...props}>
      {leftIcon && leftIcon}
      <Text small={size === 'S'}>{children}</Text>
      {rightIcon && rightIcon}
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
