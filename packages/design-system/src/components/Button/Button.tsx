import * as React from 'react';

import { Loader } from '@strapi/icons';
import { styled, keyframes } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { Typography } from '../../primitives/Typography';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { forwardRef } from '../../utilities/forwardRef';

import { BUTTON_SIZES, ButtonVariant, ButtonSize, DEFAULT } from './constants';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';

type ButtonProps<C extends React.ElementType = 'button'> = FlexProps<C> & {
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit' | 'reset';
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
      size = BUTTON_SIZES[1],
      loading = false,
      fullWidth = false,
      type = 'button',
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

    // Only forward the `type` attribute when we actually render a native button
    const asTag = (props as { tag?: React.ElementType }).tag ?? 'button';
    const buttonType = asTag === 'button' || asTag === 'input' ? type : undefined;

    return (
      <ButtonWrapper
        ref={ref}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        $size={size}
        $variant={variant}
        tag="button"
        onClick={handleClick}
        hasRadius
        gap={2}
        inline
        alignItems="center"
        justifyContent="center"
        width={fullWidth ? '100%' : undefined}
        paddingLeft={4}
        paddingRight={4}
        cursor="pointer"
        type={buttonType}
        {...props}
      >
        {(startIcon || loading) && (
          <Flex tag="span" aria-hidden>
            {loading ? <LoaderAnimated /> : startIcon}
          </Flex>
        )}

        <Typography variant={size === 'S' ? 'pi' : undefined} fontWeight="bold">
          {children}
        </Typography>

        {endIcon && (
          <Flex tag="span" aria-hidden>
            {endIcon}
          </Flex>
        )}
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

type ButtonWrapperProps = PropsToTransientProps<Required<Pick<ButtonProps, 'size' | 'variant'>>>;

const ButtonWrapper = styled<FlexComponent<'button'>>(Flex)<ButtonWrapperProps>`
  ${({ theme, $size }) => {
    const sizeValue = theme.sizes.button[$size];

    if (typeof sizeValue === 'string') {
      return `height: ${sizeValue};`;
    }

    const styles: string[] = [];
    Object.entries(sizeValue).forEach(([breakpoint, breakpointValue]) => {
      if (breakpointValue) {
        if (breakpoint === 'initial') {
          styles.push(`height: ${breakpointValue};`);
        } else if (breakpoint in theme.breakpoints) {
          const breakpointQuery = theme.breakpoints[breakpoint as keyof typeof theme.breakpoints];
          styles.push(`${breakpointQuery} { height: ${breakpointValue}; }`);
        }
      }
    });

    return styles.join('\n');
  }}
  text-decoration: none;
  ${getVariantStyle}

  &:hover {
    ${getHoverStyle}
  }

  &:active {
    ${getActiveStyle}
  }

  &[aria-disabled='true'] {
    ${getDisabledStyle}
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      ${(props) => props.theme.transitions.backgroundColor},
      ${(props) => props.theme.transitions.color},
      border-color ${(props) => props.theme.motion.timings['200']} ${(props) => props.theme.motion.easings.easeOutQuad};
  }
`;

export { Button };
export type { ButtonComponent, ButtonProps };
