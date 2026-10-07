import * as React from 'react';

import { getFocusableNodes } from '../../../helpers/getFocusableNodes';
import { useComposedRefs } from '../../../hooks/useComposeRefs';

interface FocusTrapProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Called when the user presses Escape inside the trap. Use it to close the trapped surface.
   */
  onEscape?: () => void;
  /**
   * If true, the focus goes back to the element that had it before the trap mounted, when the trap unmounts.
   * @default true
   */
  restoreFocus?: boolean;
  /**
   * If true, the trap does not move the focus to its first focusable element on mount. Use it when you
   * focus an element yourself.
   * @default false
   */
  skipAutoFocus?: boolean;
}

/**
 * Keeps the keyboard focus inside its children: Tab on the last focusable element goes back to the first,
 * Shift+Tab on the first goes to the last.
 */
const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  ({ onEscape, restoreFocus = true, skipAutoFocus = false, onKeyDown, ...props }, forwardedRef) => {
    const trappedRef = React.useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(trappedRef, forwardedRef);

    // Gives the focus back to the element that had it before, often the button that opened the trap
    React.useEffect(() => {
      const previousFocus = restoreFocus ? (document.activeElement as HTMLElement | null) : null;

      return () => {
        previousFocus?.focus();
      };
    }, [restoreFocus]);

    // Moves the focus to the first focusable element of the trap
    React.useEffect(() => {
      if (!trappedRef.current || skipAutoFocus) return;

      const focusableChildren = getFocusableNodes(trappedRef.current);

      if (focusableChildren.length > 0) {
        focusableChildren[0].focus();
      } else {
        console.warn(
          '[FocusTrap]: it seems there are no focusable elements in the focus trap tree. Make sure there s at least one.',
        );
      }
    }, [skipAutoFocus]);

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || !trappedRef.current) return;

      if (event.key === 'Escape' && onEscape) {
        onEscape();

        return;
      }

      if (event.key !== 'Tab') return;

      const focusableChildren = getFocusableNodes(trappedRef.current);

      if (focusableChildren.length === 0) return;

      const firstElement = focusableChildren[0];
      const lastElement = focusableChildren[focusableChildren.length - 1];

      if (event.shiftKey) {
        if (firstElement === document.activeElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (lastElement === document.activeElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    return <div ref={ref} data-slot="focus-trap" onKeyDown={handleKeyDown} {...props} />;
  },
);

FocusTrap.displayName = 'FocusTrap';

export { FocusTrap };
export type { FocusTrapProps };
