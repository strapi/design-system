import * as React from 'react';

import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * The element to append the portaled `<div>` to.
   * @default document.body
   */
  container?: HTMLElement | null;
}

/**
 * Renders a `<div>` with its children into another part of the DOM, `document.body` by default. It renders
 * nothing on the server, or when `container` is `null`.
 */
const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ container = globalThis?.document?.body, className, ...props }, ref) => {
    if (!container) {
      return null;
    }

    // The cast bridges two copies of the React types, as in the legacy Portal
    return createPortal(
      <div ref={ref} data-slot="portal" className={cn(className)} {...props} />,
      container,
    ) as React.ReactElement;
  },
);

Portal.displayName = 'Portal';

export { Portal };
export type { PortalProps };
