import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }) => {
  const rootRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    rootRef.current = document.createElement('div');
    rootRef.current.setAttribute('data-react-portal', 'true');
    document.body.appendChild(rootRef.current);

    setIsMounted(true);

    return () => {
      rootRef.current?.remove();
    };
  }, []);

  if (!isMounted || !rootRef.current) {
    return null;
  }

  return createPortal(children, rootRef.current);
};
