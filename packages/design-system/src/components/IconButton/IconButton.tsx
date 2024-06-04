import * as React from 'react';

import { styled } from 'styled-components';

import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { AccessibleIcon } from '../../utilities/AccessibleIcon';
import { forwardRef } from '../../utilities/forwardRef';
import { BaseButton, BaseButtonComponent, BaseButtonProps } from '../BaseButton';
import { Flex, FlexComponent } from '../Flex';
import { Tooltip } from '../Tooltip';

// TODO: we should align the default state in v2 with the Button
// component
const VARIANT_DEFAULT = 'tertiary';
const VARIANT_SECONDARY = 'secondary';

const SIZES = ['S', 'M', 'L'] as const;
const VARIANTS = [VARIANT_DEFAULT, VARIANT_SECONDARY] as const;

type IconButtonSize = (typeof SIZES)[number];
type IconButtonVariant = (typeof VARIANTS)[number];

type IconButtonProps<C extends React.ElementType = 'button'> = BaseButtonProps<C> & {
  children: React.ReactNode;
  /**
   * This isn't visually rendererd, but required for accessibility.
   */
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * @default 'S'
   */
  size?: IconButtonSize;
  /**
   * @default 'tertiary'
   */
  variant?: IconButtonVariant;
  /**
   * @default true
   */
  withTooltip?: boolean;
};

const IconButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      label,
      background,
      children,
      disabled = false,
      onClick,
      size = SIZES[0],
      variant = VARIANTS[0],
      withTooltip = true,
      ...restProps
    }: IconButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    };

    const component = (
      <IconButtonWrapper
        aria-disabled={disabled}
        background={disabled ? 'neutral150' : background}
        justifyContent="center"
        {...restProps}
        ref={ref}
        $size={size}
        onClick={handleClick}
        $variant={variant}
      >
        <AccessibleIcon label={label}>{children}</AccessibleIcon>
      </IconButtonWrapper>
    );

    return withTooltip ? <Tooltip label={label}>{component}</Tooltip> : component;
  },
);

type IconButtonComponent<C extends React.ElementType = 'button'> = (props: IconButtonProps<C>) => React.ReactNode;

const IconButtonWrapper = styled<BaseButtonComponent>(BaseButton)<
  PropsToTransientProps<Required<Pick<IconButtonProps, 'size' | 'variant'>>>
>`
  background-color: ${({ theme, $variant }) => {
    if ($variant === VARIANT_SECONDARY) {
      return theme.colors.primary100;
    }

    return undefined;
  }};
  border-color: ${({ theme, $variant }) => {
    if ($variant === VARIANT_SECONDARY) {
      return theme.colors.primary200;
    }

    return theme.colors.neutral200;
  }};
  height: ${({ theme, $size }) => theme.sizes.button[$size]};
  width: ${({ theme, $size }) => theme.sizes.button[$size]};
  color: ${({ theme, $variant }) => {
    if ($variant === VARIANT_SECONDARY) {
      return theme.colors.primary500;
    }

    return theme.colors.neutral500;
  }};

  &:hover,
  &:focus {
    color: ${({ theme, $variant }) => {
      if ($variant === VARIANT_SECONDARY) {
        return theme.colors.primary600;
      }

      return theme.colors.neutral600;
    }};
  }

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral600};
  }
`;

const IconButtonGroup = styled<FlexComponent>(Flex)`
  & ${IconButtonWrapper}:first-child {
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
  }

  & ${IconButtonWrapper}:last-child {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
  }

  & ${IconButtonWrapper} {
    border-radius: 0;
    color: ${({ theme }) => theme.colors.neutral700};

    & + ${IconButtonWrapper} {
      border-left: none;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      color: ${({ theme }) => theme.colors.neutral800};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.neutral150};
      color: ${({ theme }) => theme.colors.neutral900};
    }

    &[aria-disabled='true'] {
      color: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;

export { IconButton, IconButtonGroup };
export type { IconButtonProps, IconButtonComponent, IconButtonSize, IconButtonVariant };
