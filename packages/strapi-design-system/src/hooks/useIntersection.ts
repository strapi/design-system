import { MutableRefObject, useEffect } from 'react';

import { useCallbackRef } from '@strapi/ui-primitives';

interface UseIntersectionOptions {
  selectorToWatch: string;
  skipWhen?: boolean;
}

export const useIntersection = (
  scrollableAreaRef: MutableRefObject<HTMLElement | null>,
  callback: (entry: IntersectionObserverEntry) => void,
  { selectorToWatch, skipWhen = false }: UseIntersectionOptions,
) => {
  const handleIntersection = useCallbackRef(callback);

  useEffect(() => {
    if (skipWhen || !scrollableAreaRef.current) return;

    const options = {
      root: scrollableAreaRef.current,
      rootMargin: '0px',
    };

    const onEnterZone: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollableAreaRef.current) {
          if (scrollableAreaRef.current.scrollHeight > scrollableAreaRef.current.clientHeight) {
            handleIntersection(entry);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onEnterZone, options);
    /**
     * @note We need to escape the selector because we use `React.useId` to generate our ids an
     * they contain `:` which is not a valid selector because it's part of the CSS spec
     */
    const target = scrollableAreaRef.current.querySelector(selectorToWatch);

    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [skipWhen, handleIntersection, selectorToWatch, scrollableAreaRef]);
};
