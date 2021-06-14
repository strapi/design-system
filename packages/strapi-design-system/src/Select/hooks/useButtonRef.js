import { useEffect, useRef } from 'react';

export const useButtonRef = (expanded) => {
  const buttonRef = useRef(null);
  const mountedRef = useRef(null);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (expanded) return;

    buttonRef.current.focus();
  }, [expanded]);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return buttonRef;
};
