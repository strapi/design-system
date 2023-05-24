import * as React from 'react';

import { createPortal } from 'react-dom';

import { Box, BoxProps } from '../Box';

export interface PortalProps extends BoxProps<'div'> {
  container?: HTMLElement | null;
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ container = globalThis?.document?.body, ...portalProps }, forwardedRef) => {
    return container ? createPortal(<Box ref={forwardedRef} {...portalProps} />, container) : null;
  },
);

Portal.displayName = 'Portal';
