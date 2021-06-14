import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const StyledSelectButton = styled.button`
  text-align: left;
  border: none;
  padding-left: ${({ theme, hasLeftAction }) => (hasLeftAction ? 0 : theme.spaces[4])};
  padding-right: ${({ theme, hasRightAction }) => (hasRightAction ? 0 : theme.spaces[4])};
  padding-top: ${({ theme }) => `${theme.spaces[3]}`};
  padding-bottom: ${({ theme }) => `${theme.spaces[3]}`};
  display: block;
  width: 100%;
  background: transparent;

  // The focus state is moved to the parent thanks to :focus-within
  &:focus {
    outline: none;
  }
`;

export const SelectButton = forwardRef(({ children, labelledBy, expanded, onTrigger, disabled, ...props }, ref) => {
  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case KeyboardKeys.DOWN:
      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        onTrigger();
        break;
      }

      case KeyboardKeys.UP: {
        onTrigger('up');
        break;
      }

      default:
        break;
    }
  };

  return (
    <StyledSelectButton
      ref={ref}
      aria-labelledby={labelledBy}
      aria-haspopup="listbox"
      aria-expanded={expanded}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </StyledSelectButton>
  );
});

SelectButton.displayName = 'SelectButton';

SelectButton.defaultProps = {
  expanded: false,
  disabled: false,
};

SelectButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  labelledBy: PropTypes.string.isRequired,
  onTrigger: PropTypes.func.isRequired,
};
