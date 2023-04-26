import { RefObject, useEffect, useRef } from 'react';

import { off, on } from './utils';

const defaultEvents = ['mousedown', 'touchstart'];

const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events: string[] = defaultEvents,
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const handler = (event) => {
      const { current: el } = ref;

      if (el && !el.contains(event.target)) {
        savedCallback.current(event);
      }
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of events) {
      on(document, eventName, handler);
    }

    return () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, ref]);
};

export default useClickAway;
