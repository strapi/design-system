import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getFocusableNodes } from '../helpers/getFocusableNodes';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const FocusTrap = ({ onEscape, restoreFocus, ...props }) => {
  const trappedRef = useRef(null);

  /**
   * Restore the focus to the previously focused element (often, it's the CTA that opened the trap)
   */
  useEffect(() => {
    if (restoreFocus) {
      const currentFocus = document.activeElement;

      return () => {
        currentFocus.focus();
      };
    }
  }, [restoreFocus]);

  /**
   * Sends the focus to the first element of the focus trap tree
   */
  useEffect(() => {
    if (!trappedRef.current) return;

    const focusableChildren = getFocusableNodes(trappedRef.current);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren[0];

      firstElement.focus();
    } else {
      console.warn(
        '[FocusTrap]: it seems there are no focusable elements in the focus trap tree. Make sure there s at least one.',
      );
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === KeyboardKeys.ESCAPE) {
      return onEscape();
    }

    if (e.key !== KeyboardKeys.TAB) return;

    const focusableChildren = getFocusableNodes(trappedRef.current);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren[0];
      const lastElement = focusableChildren[focusableChildren.length - 1];

      // e.shiftKey allows to verify reverse tab
      if (e.shiftKey) {
        if (firstElement === document.activeElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else if (lastElement === document.activeElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  return <div ref={trappedRef} onKeyDown={handleKeyDown} {...props} />;
};

FocusTrap.defaultProps = {
  restoreFocus: true,
};

FocusTrap.propTypes = {
  onEscape: PropTypes.func.isRequired,
  restoreFocus: PropTypes.bool,
};
