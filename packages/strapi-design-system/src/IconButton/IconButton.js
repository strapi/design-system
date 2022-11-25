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
  ({ label, noBorder, children, icon, disabled, onClick, 'aria-label': ariaLabel, ...restProps }, ref) => {
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
          {cloneElement(icon || children, {
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
          {cloneElement(icon || children, {
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
  'aria-label': undefined,
  children: undefined,
  disabled: false,
  icon: undefined,
  label: undefined,
  noBorder: false,
  onClick: undefined,
};

/**
 * @type {(otherProps: string[]) => (props: Record<string, unknown>, propName: string) => Error | undefined}
 */
const throwPropErrorIfNoneAreDefined = (otherProps, propType) => (props, propName) => {
  if (!props[propName] && otherProps.every((otherProp) => !props[otherProp])) {
    return new Error(`One of the following props is required: ${propName}, ${otherProps.join(', ')}`);
  }

  return PropTypes.checkPropTypes({ [propName]: PropTypes[propType] }, props, 'prop', 'IconButton');
};

IconButton.propTypes = {
  /**
   * `PropTypes.string` – must be defined if `label` is not defined.
   */
  'aria-label': throwPropErrorIfNoneAreDefined(['label'], 'string'),
  /**
   * `PropTypes.node` – must be defined if `icon` is not defined.
   */
  children: throwPropErrorIfNoneAreDefined(['icon'], 'node'),
  disabled: PropTypes.bool,
  /**
   * `PropTypes.node` – must be defined if `children` is not defined.
   */
  icon: throwPropErrorIfNoneAreDefined(['children'], 'node'),
  /**
   * `PropTypes.string` – must be defined if `aria-label` is not defined.
   */
  label: throwPropErrorIfNoneAreDefined(['aria-label'], 'string'),
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};
