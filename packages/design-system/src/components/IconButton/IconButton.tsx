import * as React from 'react';

import { css, styled } from 'styled-components';

import { Flex, FlexComponent, FlexProps } from '../../primitives/Flex';
import { PolymorphicRef, PropsToTransientProps } from '../../types';
import { AccessibleIcon } from '../../utilities/AccessibleIcon';
import { forwardRef } from '../../utilities/forwardRef';
import { ButtonProps } from '../Button';
import { getActiveStyle, getDisabledStyle, getHoverStyle, getVariantStyle } from '../Button/utils';
import { Tooltip } from '../Tooltip';

type IconButtonProps<C extends React.ElementType = 'button'> = FlexProps<C> &
  Pick<ButtonProps, 'size' | 'variant'> & {
    children: React.ReactNode;
    disabled?: boolean;
    /**
     * This isn't visually rendered, but required for accessibility.
     */
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
      size = 'S',
      variant = 'tertiary',
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
        tag="button"
        display="inline-flex"
        justifyContent="center"
        hasRadius
        cursor="pointer"
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

type IconButtonWrapperProps = PropsToTransientProps<Required<Pick<IconButtonProps, 'size' | 'variant'>>>;

const IconButtonWrapper = styled<FlexComponent<'button'>>(Flex)<IconButtonWrapperProps>`
  text-decoration: none;

  ${(props) => {
    // NOTE! the border adds `1px` on each edge, so the padding accounts for this.
    switch (props.$size) {
      case 'XS': {
        return css`
          padding-block: 0.2rem;
          padding-inline: 0.2rem;
        `;
      }
      case 'S': {
        return css`
          padding-block: 0.7rem;
          padding-inline: 0.7rem;
        `;
      }
      case 'M': {
        return css`
          padding-block: 0.9rem;
          padding-inline: 0.9rem;
        `;
      }
      case 'L': {
        return css`
          padding-block: 1.1rem;
          padding-inline: 1.1rem;
        `;
      }
    }
  }}
  ${getVariantStyle}
  ${(props) =>
    props.$variant === 'tertiary'
      ? css`
          color: ${props.theme.colors.neutral500};
        `
      : ''}

  &:hover {
    ${getHoverStyle}
    ${(props) =>
      props.$variant === 'tertiary'
        ? css`
            color: ${props.theme.colors.neutral600};
          `
        : ''}
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

const IconButtonGroup = styled<FlexComponent>(Flex)`
  & ${IconButtonWrapper}:first-child {
    border-radius: ${({ theme }) => `${theme.borderRadius} 0 0 ${theme.borderRadius}`};
  }

  & ${IconButtonWrapper}:last-child {
    border-radius: ${({ theme }) => `0 ${theme.borderRadius} ${theme.borderRadius} 0`};
  }

  & ${IconButtonWrapper} {
    border-radius: 0;

    & + ${IconButtonWrapper} {
      border-left: none;
    }
  }
`;

export { IconButton, IconButtonGroup };
export type { IconButtonProps, IconButtonComponent };
