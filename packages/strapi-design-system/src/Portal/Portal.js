import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export const Portal = ({ children }) => {
  const rootRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
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

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};
