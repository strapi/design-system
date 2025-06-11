import * as React from 'react';

import { stripReactIdOfColon } from '../../helpers/strings';
import { useComposedRefs } from '../../hooks/useComposeRefs';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';
import { BaseLink } from '../BaseLink';

import * as Menu from './Menu';

/* -------------------------------------------------------------------------------------------------
 * SimpleMenu
 * -----------------------------------------------------------------------------------------------*/

type SimpleMenuProps = Menu.TriggerProps &
  Pick<Menu.ContentProps, 'popoverPlacement' | 'intersectionId'> & {
    children?: React.ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    /**
     * Callback function to be called when the popover reaches the end of the scrollable content
     */
    onReachEnd?: (entry: IntersectionObserverEntry) => void;
  };

const SimpleMenu = React.forwardRef<HTMLButtonElement, SimpleMenuProps>(
  ({ children, onOpen, onClose, popoverPlacement, onReachEnd, ...props }, forwardedRef) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const composedRef = useComposedRefs(forwardedRef, triggerRef);
    /**
     * Used for the intersection observer
     */
    const contentRef = React.useRef<HTMLDivElement>(null);

    const [internalIsOpen, setInternalIsOpen] = React.useState(false);

    const handleReachEnd = (entry: IntersectionObserverEntry) => {
      if (onReachEnd) {
        onReachEnd(entry);
      }
    };

    const handleOpenChange = (isOpen: boolean) => {
      if (isOpen && typeof onOpen === 'function') {
        onOpen();
      } else if (!isOpen && typeof onClose === 'function') {
        onClose();
      }

      setInternalIsOpen(isOpen);
    };

    const generatedId = useId();
    const intersectionId = `intersection-${stripReactIdOfColon(generatedId)}`;

    useIntersection(contentRef, handleReachEnd, {
      selectorToWatch: `#${intersectionId}`,
      /**
       * We need to know when the select is open because only then will viewportRef
       * not be null. Because it uses a portal that (sensibly) is not mounted 24/7.
       */
      skipWhen: !internalIsOpen,
    });

    return (
      <Menu.Root onOpenChange={handleOpenChange}>
        <Menu.Trigger ref={composedRef} {...props}>
          {props.label}
        </Menu.Trigger>
        <Menu.Content ref={contentRef} intersectionId={intersectionId} popoverPlacement={popoverPlacement}>
          {children}
        </Menu.Content>
      </Menu.Root>
    );
  },
);

const MenuItem = Menu.Item;
type MenuItemProps<T extends React.ComponentType = typeof BaseLink> = Menu.ItemProps<T>;

export { SimpleMenu, MenuItem, Menu };
export type { SimpleMenuProps, MenuItemProps };
