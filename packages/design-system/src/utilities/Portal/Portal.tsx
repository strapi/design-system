import * as React from 'react';

import { createPortal } from 'react-dom';

import { Box, BoxProps } from '../../components/Box';

type PortalElement = HTMLDivElement;

interface PortalProps extends BoxProps<'div'> {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null;
}

const Portal = React.forwardRef<PortalElement, PortalProps>(
  ({ container = globalThis?.document?.body, ...portalProps }, forwardedRef) => {
    return container ? createPortal(<Box ref={forwardedRef} {...portalProps} />, container) : null;
  },
);

Portal.displayName = 'Portal';

export { Portal };
export type { PortalProps, PortalElement };
