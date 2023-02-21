import { KeyboardEvent } from 'react';

import { Box, BoxProps } from '../Box';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export interface KeyboardNavigableProps extends BoxProps {
  tagName?: string;
  attributeName?: string;
}

export const KeyboardNavigable = ({ tagName, attributeName = '', ...props }: KeyboardNavigableProps) => {
  const isValidFocusedElement = () => {
    const focused = document.activeElement;

    if (!focused) {
      return false;
    }

    if (tagName) {
      return focused.tagName.toLowerCase() === tagName;
    }

    return focused.hasAttribute(attributeName);
  };

  const queryElement = (parentEl: HTMLElement) => {
    if (tagName) {
      return parentEl.querySelectorAll(tagName);
    }

    return parentEl.querySelectorAll(`[${attributeName}]`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case KeyboardKeys.RIGHT:
      case KeyboardKeys.DOWN: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const focused = document.activeElement;

          const allElements = [...queryElement(e.currentTarget)] as HTMLElement[];
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
          const allElements = [...queryElement(e.currentTarget)] as HTMLElement[];
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
          const focusElement = allElements.item(0) as HTMLElement;

          focusElement.focus();
        }

        break;
      }

      case KeyboardKeys.END: {
        if (isValidFocusedElement()) {
          e.preventDefault();

          const allElements = queryElement(e.currentTarget);
          const focusElement = allElements.item(allElements.length - 1) as HTMLElement;

          focusElement.focus();
        }

        break;
      }

      default:
        break;
    }
  };

  return <Box onKeyDown={handleKeyDown} {...props} />;
};
