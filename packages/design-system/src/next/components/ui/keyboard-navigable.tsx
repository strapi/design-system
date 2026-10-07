import * as React from 'react';

interface KeyboardNavigableProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The tag name of the elements to move between, in lower case, for example `button` or `article`.
   * It wins over `attributeName`.
   */
  tagName?: string;
  /**
   * The attribute that marks the elements to move between, used when `tagName` is not set.
   */
  attributeName?: string;
}

/**
 * Moves the focus between its descendants with the arrow keys, Home and End.
 *
 * Right and Down go to the next element and wrap to the first, Left and Up go to the previous one and
 * wrap to the last. The keys only act while a matching element has the focus.
 */
const KeyboardNavigable = React.forwardRef<HTMLDivElement, KeyboardNavigableProps>(
  ({ tagName, attributeName = '', onKeyDown, ...props }, ref) => {
    const isValidFocusedElement = () => {
      const focused = document.activeElement;

      if (!focused) {
        return false;
      }

      if (tagName) {
        return focused.tagName.toLowerCase() === tagName;
      }

      return attributeName !== '' && focused.hasAttribute(attributeName);
    };

    const queryElements = (parent: HTMLElement): HTMLElement[] => {
      if (tagName) {
        return [...parent.querySelectorAll<HTMLElement>(tagName)];
      }

      return [...parent.querySelectorAll<HTMLElement>(`[${attributeName}]`)];
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented || !isValidFocusedElement()) return;

      const elements = queryElements(event.currentTarget);

      if (elements.length === 0) return;

      const focusedIndex = elements.findIndex((node) => node === document.activeElement);

      let nextElement: HTMLElement | undefined;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextElement = elements[focusedIndex + 1 < elements.length ? focusedIndex + 1 : 0];
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextElement = elements[focusedIndex - 1 > -1 ? focusedIndex - 1 : elements.length - 1];
          break;
        case 'Home':
          nextElement = elements[0];
          break;
        case 'End':
          nextElement = elements[elements.length - 1];
          break;
        default:
          return;
      }

      event.preventDefault();
      nextElement?.focus();
    };

    return <div ref={ref} data-slot="keyboard-navigable" onKeyDown={handleKeyDown} {...props} />;
  },
);

KeyboardNavigable.displayName = 'KeyboardNavigable';

export { KeyboardNavigable };
export type { KeyboardNavigableProps };
