/**
 * TODO: This should be moved to the `hooks` folder
 */
import { MutableRefObject, useEffect } from 'react';

import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

interface UseIntersectionOptions {
  selectorToWatch: string;
  skipWhen?: boolean;
}

export const useIntersection = (
  scrollableAreaRef: MutableRefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void,
  { selectorToWatch, skipWhen = false }: UseIntersectionOptions,
) => {
  const handleIntersection = useCallbackRef(callback);

  useEffect(() => {
    if (skipWhen) return;

    const options = {
      root: scrollableAreaRef.current,
      rootMargin: '0px',
    };

    const onEnterZone: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (scrollableAreaRef.current.scrollHeight > scrollableAreaRef.current.clientHeight) {
            handleIntersection(entry);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onEnterZone, options);
    const target = scrollableAreaRef.current.querySelector(selectorToWatch);

    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [skipWhen, handleIntersection, selectorToWatch, scrollableAreaRef]);
};
