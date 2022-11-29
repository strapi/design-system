import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from '@strapi/icons';

import { Typography } from '../Typography';
import { Box } from '../Box';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';
import { BUTTON_SIZES, Variant, ButtonSizes, DEFAULT } from './constants';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingWrapper = styled.div`
  animation: ${rotation} 2s infinite linear;
  will-change: transform;
`;

const BoxFullHeight = styled(Box)`
  height: 100%;
`;

type ButtonWrapperProps = Required<Pick<ButtonProps, 'size' | 'fullWidth' | 'variant'>>;

export const ButtonWrapper = styled(BaseButton)<ButtonWrapperProps>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.buttonPrimary600};
  border: 1px solid ${({ theme }) => theme.colors.buttonPrimary600};
  height: ${({ theme, size }) => theme.sizes.button[size]};
  padding-left: ${({ theme }) => theme.spaces[4]};
  padding-right: ${({ theme }) => theme.spaces[4]};

  ${Box} {
    display: flex;
    align-items: center;
  }

  ${Typography} {
    color: ${({ theme }) => theme.colors.buttonNeutral0};
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
  ${({ fullWidth }) =>
    fullWidth &&
    `
    display: inline-flex;
    justify-content: center;
    width: 100%;
  `}
`;

export interface ButtonProps extends BaseButtonProps {
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSizes;
  startIcon?: React.ReactNode;
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = DEFAULT,
      startIcon,
      endIcon,
      disabled = false,
      children,
      onClick,
      size = BUTTON_SIZES[0],
      loading = false,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    return (
      <ButtonWrapper
        ref={ref}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        size={size}
        variant={variant}
        onClick={handleClick}
        fullWidth={fullWidth}
        {...props}
      >
        {(startIcon || loading) && (
          <BoxFullHeight aria-hidden paddingRight={2}>
            {loading ? (
              <LoadingWrapper>
                <Loader />
              </LoadingWrapper>
            ) : (
              startIcon
            )}
          </BoxFullHeight>
        )}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold" lineHeight={0}>
          {children}
        </Typography>

        {endIcon && (
          <Box aria-hidden paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';
