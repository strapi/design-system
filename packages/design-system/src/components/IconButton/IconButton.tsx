import * as React from 'react';

import { styled } from 'styled-components';

import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';
import { VisuallyHidden } from '../../utilities/VisuallyHidden';
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

type SharedIconButtonProps<C extends React.ElementType = 'button'> = BaseButtonProps<C> & {
  /**
   * @preserve
   * @deprecated use `borderWidth={0}` instead
   */
  noBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
};

type LabelOnlyProps<C extends React.ElementType = 'button'> = SharedIconButtonProps<C> & {
  label: string;
  ['aria-label']?: never;
};

type AriaLabelOnlyProps<C extends React.ElementType = 'button'> = SharedIconButtonProps<C> & {
  label?: never;
  ['aria-label']: string;
};

interface IconOnlyProps {
  icon: React.ReactNode;
  children?: never;
}

interface ChildrenOnlyProps {
  icon?: never;
  children: React.ReactNode;
}

type ChildrenWithLabel<C extends React.ElementType = 'button'> = LabelOnlyProps<C> & ChildrenOnlyProps;
type ChildrenWithAriaLabel<C extends React.ElementType = 'button'> = AriaLabelOnlyProps<C> & ChildrenOnlyProps;
type IconWithLabel<C extends React.ElementType = 'button'> = LabelOnlyProps<C> & IconOnlyProps;
type IconWithAriaLabel<C extends React.ElementType = 'button'> = AriaLabelOnlyProps<C> & IconOnlyProps;

type IconButtonProps<C extends React.ElementType = 'button'> =
  | ChildrenWithLabel<C>
  | ChildrenWithAriaLabel<C>
  | IconWithLabel<C>
  | IconWithAriaLabel<C>;

const IconButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    {
      label,
      background,
      borderWidth,
      noBorder = false,
      children,
      icon,
      disabled = false,
      onClick,
      size = SIZES[0],
      'aria-label': ariaLabel,
      variant = VARIANTS[0],
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
        borderWidth={noBorder ? 0 : borderWidth}
        justifyContent="center"
        {...restProps}
        ref={ref}
        $size={size}
        onClick={handleClick}
        $variant={variant}
      >
        <VisuallyHidden>{label ?? ariaLabel}</VisuallyHidden>

        {React.cloneElement((icon || children) as React.ReactElement, {
          'aria-hidden': true,
          focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
        })}
      </IconButtonWrapper>
    );

    return label ? <Tooltip label={label}>{component}</Tooltip> : component;
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
  & span:first-child button {
    border-left: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
  }

  & span:last-child button {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
  }

  & ${IconButtonWrapper} {
    border-radius: 0;
    border-left: none;
    color: ${({ theme }) => theme.colors.neutral700};

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
