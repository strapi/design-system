import { useRef, useState } from 'react';

import * as Menu from './Menu';
import { useId } from '../../hooks/useId';
import { useIntersection } from '../../hooks/useIntersection';

/* -------------------------------------------------------------------------------------------------
 * SimpleMenu
 * -----------------------------------------------------------------------------------------------*/

interface SimpleMenuProps
  extends Omit<Menu.TriggerProps, 'children'>,
    Pick<Menu.ContentProps, 'popoverPlacement' | 'intersectionId'> {
  children: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  /**
   * Callback function to be called when the popover reaches the end of the scrollable content
   */
  onReachEnd?: (entry: IntersectionObserverEntry) => void;
}

const SimpleMenu = ({
  children,
  id,
  onOpen = () => {},
  onClose = () => {},
  popoverPlacement,
  onReachEnd,
  ...props
}: SimpleMenuProps) => {
  /**
   * Used for the intersection observer
   */
  const contentRef = useRef<HTMLDivElement>(null);

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const handleReachEnd = (entry: IntersectionObserverEntry) => {
    if (onReachEnd) {
      onReachEnd(entry);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }

    setInternalIsOpen(isOpen);
  };

  const generatedId = useId(id);

  const intersectionId = `intersection-${generatedId}`;

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
      <Menu.Trigger {...props}>{props.label}</Menu.Trigger>
      <Menu.Content intersectionId={intersectionId} popoverPlacement={popoverPlacement}>
        {children}
      </Menu.Content>
    </Menu.Root>
  );
};

const MenuItem = Menu.Item;
type MenuItemProps = Menu.ItemProps;

export { SimpleMenu, MenuItem, Menu };
export type { SimpleMenuProps, MenuItemProps };
