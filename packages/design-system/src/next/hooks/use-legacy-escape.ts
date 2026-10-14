import * as React from 'react';

import type { BaseUIChangeEventDetails } from '@base-ui/react/types';

/**
 * Lets an open layer of the old DS (e.g., a Select) handle Escape, so it does not also close the Base UI overlay.
 * Remove it when the old DS is sunset.
 */
export function useLegacyEscape<
  Actions extends { close: () => void },
  Details extends BaseUIChangeEventDetails<string>,
>(
  actionsRef: React.RefObject<Actions | null> | undefined,
  onOpenChange: ((open: boolean, eventDetails: Details) => void) | undefined,
) {
  const ownActionsRef = React.useRef<Actions>(null);
  const resolvedActionsRef = actionsRef ?? ownActionsRef;
  const lastEscapeRef = React.useRef<Event | null>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => () => clearTimeout(closeTimeoutRef.current), []);

  const handleOpenChange = (open: boolean, eventDetails: Details) => {
    if (eventDetails.reason !== 'escape-key') {
      onOpenChange?.(open, eventDetails);
      return;
    }

    eventDetails.cancel();
    eventDetails.allowPropagation();

    // Base UI handles Escape twice: on the popup (onKeyDown) and on the document
    const { event } = eventDetails;
    if (lastEscapeRef.current === event) return;
    lastEscapeRef.current = event;

    // Base UI runs before the old DS: wait for it, and close only if it did not handle Escape
    closeTimeoutRef.current = setTimeout(() => {
      if (!event.defaultPrevented) resolvedActionsRef.current?.close();
    });
  };

  return { actionsRef: resolvedActionsRef, onOpenChange: handleOpenChange };
}
