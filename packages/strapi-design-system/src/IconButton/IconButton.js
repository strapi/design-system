import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from '../Tooltip';
import { BaseButton } from '../BaseButton';
import { Flex } from '../Flex';
import { VisuallyHidden } from '../VisuallyHidden';

const IconButtonWrapper = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;

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
    background-color: ${({ theme }) => theme.colors.neutral150};
    svg {
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  ${({ noBorder }) => (noBorder ? `border: none;` : undefined)}
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

export const IconButton = React.forwardRef(
  ({ label, noBorder, children, icon, disabled, onClick, ['aria-label']: ariaLabel, ...restProps }, ref) => {
    /**
     * @type {React.MouseEventHandler<HTMLButtonElement>}
     */
    const handleClick = (e) => {
      if (!disabled && onClick) {
        onClick(e);
      }
    };

    if (!label) {
      return (
        <IconButtonWrapper {...restProps} ref={ref} noBorder={noBorder} onClick={handleClick} aria-disabled={disabled}>
          <VisuallyHidden as="span">{ariaLabel}</VisuallyHidden>
          {cloneElement(children ?? icon, {
            'aria-hidden': true,
            focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
          })}
        </IconButtonWrapper>
      );
    }

    return (
      <Tooltip label={label}>
        <IconButtonWrapper {...restProps} ref={ref} noBorder={noBorder} onClick={handleClick} aria-disabled={disabled}>
          <VisuallyHidden as="span">{label}</VisuallyHidden>
          {cloneElement(children ?? icon, {
            'aria-hidden': true,
            focusable: false, // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
          })}
        </IconButtonWrapper>
      </Tooltip>
    );
  },
);

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  label: undefined,
  noBorder: false,
  disabled: false,
  onClick: undefined,
};

/**
 * @type {(otherProps: string[]) => (props: Record<string, unknown>, propName: string) => Error | undefined}
 */
const throwPropErrorIfNoneAreDefined = (otherProps) => (props, propName) => {
  if (!props[propName] && otherProps.every((otherProp) => !props[otherProp])) {
    return new Error(`One of the following props is required: ${propName}, ${otherProps.join(', ')}`);
  }
};

IconButton.propTypes = {
  ['aria-label']: throwPropErrorIfNoneAreDefined(['label']),
  children: throwPropErrorIfNoneAreDefined(['icon']),
  disabled: PropTypes.bool,
  icon: throwPropErrorIfNoneAreDefined(['children']),
  label: throwPropErrorIfNoneAreDefined(['aria-label']),
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};
