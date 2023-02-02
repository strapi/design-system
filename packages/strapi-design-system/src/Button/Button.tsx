import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from '@strapi/icons';

import { Typography } from '../Typography';
import { Box } from '../Box';
import { Flex } from '../Flex';
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

type ButtonWrapperProps = Required<Pick<ButtonProps, 'size' | 'fullWidth' | 'variant'>>;

export const ButtonWrapper = styled(BaseButton)<ButtonWrapperProps>`
  height: ${({ theme, size }) => theme.sizes.button[size]};

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
        alignItems="center"
        background="buttonPrimary600"
        borderColor="buttonPrimary600"
        display={fullWidth ? 'inline-flex' : undefined}
        gap={2}
        justifyContent={fullWidth ? 'center' : undefined}
        paddingLeft={4}
        paddingRight={4}
        width={fullWidth ? '100%' : undefined}
        {...props}
      >
        {(startIcon || loading) && (
          <Box aria-hidden height="100%">
            {loading ? (
              <LoadingWrapper>
                <Loader />
              </LoadingWrapper>
            ) : (
              startIcon
            )}
          </Box>
        )}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold" lineHeight={0} textColor="buttonNeutral0">
          {children}
        </Typography>

        {endIcon && (
          <Flex aria-hidden>
            {endIcon}
          </Flex>
        )}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';
