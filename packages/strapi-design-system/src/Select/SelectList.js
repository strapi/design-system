import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const SelectList = forwardRef(({ labelledBy, selectedOptionId, children, onEscape }, ref) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ESCAPE: {
        onEscape();
        break;
      }

      case KeyboardKeys.DOWN: {
        const currentOption = document.activeElement;
        const nextOption = currentOption.nextSibling;

        if (nextOption) {
          return nextOption.focus();
        }
        const options = ref.current.querySelectorAll('[role="option"]');
        return options[0].focus();
      }

      case KeyboardKeys.UP: {
        const currentOption = document.activeElement;
        const previousOption = currentOption.previousSibling;

        if (previousOption) {
          return previousOption.focus();
        }
        const options = ref.current.querySelectorAll('[role="option"]');
        return options[options.length - 1].focus();
      }

      default:
        break;
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      onEscape();
    }
  };

  return (
    <ul
      role="listbox"
      aria-labelledby={labelledBy}
      aria-activedescendant={selectedOptionId}
      tabIndex={-1}
      ref={ref}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {children}
    </ul>
  );
});

SelectList.displayName = 'SelectList';

SelectList.defaultProps = {
  selectedOptionId: undefined,
};

SelectList.propTypes = {
  children: PropTypes.node.isRequired,
  labelledBy: PropTypes.string.isRequired,
  onEscape: PropTypes.func.isRequired,
  selectedOptionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
