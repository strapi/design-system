import { HTMLAttributes, KeyboardEventHandler, useEffect, useRef } from 'react';

import { getFocusableNodes } from '../helpers/getFocusableNodes';
import { KeyboardKeys } from '../helpers/keyboardKeys';

export interface FocusTrapProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A callback called on escape key. Useful to deactivate the focus trap.
   */
  onEscape?: () => void;
  /**
   * A boolean value to define whether the focus should be restored or not.
   */
  restoreFocus?: boolean;
  // Skip focusing default first element if user needs to set it manually
  skipAutoFocus?: boolean;
}

export const FocusTrap = ({ onEscape, restoreFocus = true, skipAutoFocus = false, ...props }: FocusTrapProps) => {
  const trappedRef = useRef<HTMLDivElement>(null!);

  /**
   * Restore the focus to the previously focused element (often, it's the CTA that opened the trap)
   */
  useEffect(() => {
    let currentFocus: HTMLElement | null = null;

    if (restoreFocus) {
      currentFocus = document.activeElement as HTMLElement;
    }

    return () => {
      if (currentFocus) {
        currentFocus.focus();
      }
    };
  }, [restoreFocus]);

  /**
   * Sends the focus to the first element of the focus trap tree
   */
  useEffect(() => {
    if (!trappedRef.current || skipAutoFocus) return;

    const focusableChildren = getFocusableNodes(trappedRef.current);

    if (focusableChildren.length > 0) {
      const firstElement = focusableChildren[0];

      firstElement.focus();
    } else {
      console.warn(
        '[FocusTrap]: it seems there are no focusable elements in the focus trap tree. Make sure there s at least one.',
      );
    }
  }, [skipAutoFocus]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === KeyboardKeys.ESCAPE && onEscape) {
      onEscape();

      return;
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

  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div ref={trappedRef} onKeyDown={handleKeyDown} {...props} />;
};
