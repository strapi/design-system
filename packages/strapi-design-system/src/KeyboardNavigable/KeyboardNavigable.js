import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const KeyboardNavigable = ({ tagName, ...props }) => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.ARROW_RIGHT:
      case KeyboardKeys.DOWN: {
        e.preventDefault();

        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === tagName) {
          e.preventDefault();

          const allElements = [...e.currentTarget.querySelectorAll(tagName)];
          const focusedIndex = allElements.findIndex((node) => node === focused);

          const nextIndex = focusedIndex + 1 < allElements.length ? focusedIndex + 1 : 0;
          allElements[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.ARROW_LEFT:
      case KeyboardKeys.UP: {
        e.preventDefault();

        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === tagName) {
          e.preventDefault();

          const allElements = [...e.currentTarget.querySelectorAll(tagName)];
          const focusedIndex = allElements.findIndex((node) => node === focused);

          const nextIndex = focusedIndex - 1 > -1 ? focusedIndex - 1 : allElements.length - 1;
          allElements[nextIndex].focus();
        }
        break;
      }

      case KeyboardKeys.HOME: {
        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === tagName) {
          e.preventDefault();

          const allElements = e.currentTarget.querySelectorAll(tagName);
          allElements.item(0).focus();
        }

        break;
      }

      case KeyboardKeys.END: {
        const focused = document.activeElement;

        if (focused.tagName.toLowerCase() === tagName) {
          e.preventDefault();

          const allElements = e.currentTarget.querySelectorAll(tagName);
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
  tagName: undefined,
};

KeyboardNavigable.propTypes = {
  tagName: PropTypes.string,
};
