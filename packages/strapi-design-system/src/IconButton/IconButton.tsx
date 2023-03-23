import * as React from 'react';

import styled from 'styled-components';

import { BaseButton, BaseButtonProps } from '../BaseButton';
import { Flex } from '../Flex';
import { Tooltip } from '../Tooltip';
import { VisuallyHidden } from '../VisuallyHidden';

interface SharedIconButtonProps extends BaseButtonProps {
  disabled?: boolean;
  noBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

type IconButtonProps = ChildrenWithLabel | ChildrenWithAriaLabel | IconWithLabel | IconWithAriaLabel;

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
      'aria-label': ariaLabel,
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
        height={`${32 / 16}rem`}
        width={`${32 / 16}rem`}
        {...restProps}
        ref={ref}
        onClick={handleClick}
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

const IconButtonWrapper = styled(BaseButton)`
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }

  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }

  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
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
