import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const KeyboardNavigable = ({ tagName, attributeName, ...props }) => {
  const isValidFocusedElement = () => {
    const focused = document.activeElement;

    if (tagName) {
      return focused.tagName.toLowerCase() === tagName;
    }

    return focused.hasAttribute(attributeName);
  };

  const queryElement = (parentEl) => {
    if (tagName) {
      return parentEl.querySelectorAll(tagName);
    }

    return parentEl.querySelectorAll(`[${attributeName}]`);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.RIGHT:
      case KeyboardKeys.DOWN: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const focused = document.activeElement;

          const allElements = [...queryElement(e.currentTarget)];
          const focusedIndex = allElements.findIndex((node) => node === focused);

          const nextIndex = focusedIndex + 1 < allElements.length ? focusedIndex + 1 : 0;
          allElements[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.LEFT:
      case KeyboardKeys.UP: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const focused = document.activeElement;
          const allElements = [...queryElement(e.currentTarget)];
          const focusedIndex = allElements.findIndex((node) => node === focused);

          const nextIndex = focusedIndex - 1 > -1 ? focusedIndex - 1 : allElements.length - 1;
          allElements[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.HOME: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const allElements = queryElement(e.currentTarget);
          allElements.item(0).focus();
        }

        break;
      }

      case KeyboardKeys.END: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const allElements = queryElement(e.currentTarget);
          allElements.item(allElements.length - 1).focus();
        }

        break;
      }

      default:
        break;
    }
  };

  return <Box onKeyDown={handleKeyDown} {...props} />;
};

KeyboardNavigable.defaultProps = {
  attributeName: undefined,
  tagName: undefined,
};

KeyboardNavigable.propTypes = {
  attributeName: PropTypes.string,
  tagName: PropTypes.string,
};
