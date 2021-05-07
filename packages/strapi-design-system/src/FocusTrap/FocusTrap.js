import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getFocusableNodes } from '../helpers/getFocusableNodes';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export const FocusTrap = ({ onEscape, restoreFocus, ...props }) => {
  const trappedRef = useRef(null);

  useEffect(() => {
    if (restoreFocus) {
      const currentFocus = document.activeElement;

      return () => {
        currentFocus.focus();
      };
    }
  }, [restoreFocus]);

  useEffect(() => {
    if (!trappedRef.current) return;

    const focusableChildren = getFocusableNodes(trappedRef.current);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren.item(0);
      const lastElement = focusableChildren.item(focusableChildren.length - 1);

      // Send the focus to the first element when mounting
      firstElement.focus();

      const handleKeyDown = (e) => {
        if (e.key === KeyboardKeys.ESCAPE) {
          return onEscape();
        }

        if (e.key !== KeyboardKeys.TAB) return;

        if (e.shiftKey) {
          if (firstElement === document.activeElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (lastElement === document.activeElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      trappedRef.current?.addEventListener('keydown', handleKeyDown);

      return () => {
        trappedRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return <div ref={trappedRef} {...props} />;
};

FocusTrap.defaultProps = {
  restoreFocus: true,
};

FocusTrap.propTypes = {
  onEscape: PropTypes.func.isRequired,
  restoreFocus: PropTypes.bool,
};
