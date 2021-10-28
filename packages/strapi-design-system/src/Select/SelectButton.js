import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KeyboardKeys } from '../helpers/keyboardKeys';
import { DownState, UpState } from './constants';

const StyledSelectButton = styled.button`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  background: transparent;
  border: none;

  // The focus state is moved to the parent thanks to :focus-within
  &:focus {
    outline: none;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

export const SelectButton = forwardRef(({ labelledBy, expanded, onTrigger, disabled, ...props }, ref) => {
  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case KeyboardKeys.DOWN:
      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        e.preventDefault();
        onTrigger(DownState.Keyboard);
        break;
      }

      case KeyboardKeys.UP: {
        e.preventDefault();
        onTrigger(UpState.Keyboard);
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
      type="button"
      {...props}
    />
  );
});

SelectButton.displayName = 'SelectButton';

SelectButton.defaultProps = {
  expanded: false,
  disabled: false,
};

SelectButton.propTypes = {
  disabled: PropTypes.bool,
  expanded: PropTypes.bool,
  labelledBy: PropTypes.string.isRequired,
  onTrigger: PropTypes.func.isRequired,
};
