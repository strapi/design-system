import * as React from 'react';

import styled from 'styled-components';

import { BaseButton, BaseButtonProps } from '../BaseButton';
import { Flex } from '../Flex';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';

// TODO: we should align the default state in v2 with the Button
// component
const VARIANT_DEFAULT = 'tertiary';
const VARIANT_SECONDARY = 'secondary';

const SIZES = ['S', 'M', 'L'] as const;
const VARIANTS = [VARIANT_DEFAULT, VARIANT_SECONDARY] as const;

type IconButtonSizes = (typeof SIZES)[number];
type Variant = (typeof VARIANTS)[number];

interface SharedIconButtonProps extends BaseButtonProps {
  disabled?: boolean;
  /**
   * @preserve
   * @deprecated use `borderWidth={0}` instead
   */
  noBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: IconButtonSizes;
  variant?: Variant;
}

interface LabelOnlyProps extends SharedIconButtonProps {
  label: string;
  ['aria-label']?: never;
}

interface AriaLabelOnlyProps extends SharedIconButtonProps {
  label?: never;
  ['aria-label']: string;
}

interface IconOnlyProps {
  icon: React.ReactNode;
  children?: never;
}

interface ChildrenOnlyProps {
  icon?: never;
  children: React.ReactNode;
}

type ChildrenWithLabel = LabelOnlyProps & ChildrenOnlyProps;
type ChildrenWithAriaLabel = AriaLabelOnlyProps & ChildrenOnlyProps;
type IconWithLabel = LabelOnlyProps & IconOnlyProps;
type IconWithAriaLabel = AriaLabelOnlyProps & IconOnlyProps;

export type IconButtonProps = ChildrenWithLabel | ChildrenWithAriaLabel | IconWithLabel | IconWithAriaLabel;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
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
    },
    ref,
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
        size={size}
        onClick={handleClick}
        variant={variant}
      >
        <VisuallyHidden as="span">{label ?? ariaLabel}</VisuallyHidden>

        {React.cloneElement((icon || children) as React.ReactElement, {
          'aria-hidden': true,
          focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
        })}
      </IconButtonWrapper>
    );

    return label ? <Tooltip label={label}>{component}</Tooltip> : component;
  },
);

IconButton.displayName = 'IconButton';

const IconButtonWrapper = styled(BaseButton)<Required<Pick<IconButtonProps, 'size' | 'variant'>>>`
  background-color: ${({ theme, variant }) => {
    if (variant === VARIANT_SECONDARY) {
      return theme.colors.primary100;
    }

    return undefined;
  }};
  border-color: ${({ theme, variant }) => {
    if (variant === VARIANT_SECONDARY) {
      return theme.colors.primary200;
    }

    return theme.colors.neutral200;
  }};
  height: ${({ theme, size }) => theme.sizes.button[size]};
  width: ${({ theme, size }) => theme.sizes.button[size]};

  svg {
    g,
    path {
      fill: ${({ theme, variant }) => {
        if (variant === VARIANT_SECONDARY) {
          return theme.colors.primary500;
        }

        return theme.colors.neutral500;
      }};
    }
  }

  :hover,
  :focus {
    svg {
      g,
      path {
        fill: ${({ theme, variant }) => {
          if (variant === VARIANT_SECONDARY) {
            return theme.colors.primary600;
          }

          return theme.colors.neutral600;
        }};
      }
    }
  }

  &[aria-disabled='true'] {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
`;

export const IconButtonGroup = styled(Flex)`
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

    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral700};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};

      svg {
        path {
          fill: ${({ theme }) => theme.colors.neutral800};
        }
      }
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.neutral150};
      svg {
        path {
          fill: ${({ theme }) => theme.colors.neutral900};
        }
      }
    }

    &[aria-disabled='true'] {
      svg {
        path {
          fill: ${({ theme }) => theme.colors.neutral600};
        }
      }
    }
  }
`;

IconButtonGroup.displayName = 'IconButtonGroup';
