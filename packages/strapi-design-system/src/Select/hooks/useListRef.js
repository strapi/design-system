import { useEffect, useRef } from 'react';

export const useListRef = (expanded) => {
  const listRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (!listRef.current) return;

      const lastSelected = listRef.current.querySelector('[aria-selected="true"]');
      const options = listRef.current.querySelectorAll('[role="option"]');

      if (expanded === 'up') {
        const lastOption = lastSelected || options[options.length - 1];

        if (lastOption) {
          lastOption.focus();
        }
      } else if (expanded === 'down') {
        const firstOption = lastSelected || options[0];

        if (firstOption) {
          firstOption.focus();
        }
      }
    }, 0);
  }, [expanded]);

  return listRef;
};
