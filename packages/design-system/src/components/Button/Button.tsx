import * as React from 'react';

import { Loader } from '@strapi/icons';
import { styled, keyframes } from 'styled-components';

import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Typography } from '../Typography';

import { BUTTON_SIZES, ButtonVariant, ButtonSize, DEFAULT } from './constants';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';

type ButtonProps<C extends React.ElementType = 'button'> = BaseButtonProps<C> & {
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  variant?: ButtonVariant;
};

const Button = forwardRef(
  <C extends React.ElementType = 'button'>(
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
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>,
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
        $size={size}
        $variant={variant}
        onClick={handleClick}
        alignItems="center"
        background="buttonPrimary600"
        borderColor="buttonPrimary600"
        gap={2}
        inline={fullWidth}
        justifyContent={fullWidth ? 'center' : undefined}
        paddingLeft={4}
        paddingRight={4}
        width={fullWidth ? '100%' : undefined}
        {...props}
      >
        {(startIcon || loading) && <Box aria-hidden>{loading ? <LoaderAnimated /> : startIcon}</Box>}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold">
          {children}
        </Typography>

        {endIcon && <Flex aria-hidden>{endIcon}</Flex>}
      </ButtonWrapper>
    );
  },
);

type ButtonComponent<C extends React.ElementType = 'button'> = (props: ButtonProps<C>) => React.ReactNode;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoaderAnimated = styled(Loader)`
  animation: ${rotation} 2s infinite linear;
  will-change: transform;
`;

const ButtonWrapper = styled(BaseButton)<PropsToTransientProps<Required<Pick<ButtonProps, 'size' | 'variant'>>>>`
  height: ${({ theme, $size }) => theme.sizes.button[$size]};

  svg {
    height: 1.2rem;
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

export { Button };
export type { ButtonComponent, ButtonProps };
