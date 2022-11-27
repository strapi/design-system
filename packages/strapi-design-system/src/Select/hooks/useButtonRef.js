import { useEffect, useRef } from 'react';
import { DownState, UpState } from '../constants';

export const useButtonRef = (expanded) => {
  const buttonRef = useRef(null);
  const mountedRef = useRef(null);
  /**
   * Allows to make sure to re-send the focus only when the last action was
   * triggered by a keyboard event
   */
  const previousState = useRef();

  if (expanded) {
    previousState.current = expanded;
  }

  useEffect(() => {
    if (!mountedRef.current) return;

    if (expanded) return;

    if (previousState.current === DownState.Keyboard || previousState.current === UpState.Keyboard) {
      buttonRef.current.focus();
    }
  }, [expanded]);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  return buttonRef;
};
