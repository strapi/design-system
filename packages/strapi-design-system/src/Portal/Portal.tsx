import * as React from 'react';

import { createPortal } from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null!);
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    rootRef.current = document.createElement('div');
    rootRef.current.setAttribute('data-react-portal', 'true');
    document.body.appendChild(rootRef.current);

    setMounted(true);

    return () => {
      rootRef.current?.remove();
    };
  }, []);

  if (!mounted || !rootRef.current) {
    return null;
  }

  return createPortal(children, rootRef.current);
};
