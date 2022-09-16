import { useEffect } from 'react';

export const useIntersection = (scrollableAreaRef, callback, { selectorToWatch, skipWhen = false }) => {
  useEffect(() => {
    if (skipWhen || !scrollableAreaRef.current) return;

    const options = {
      root: scrollableAreaRef.current,
      rootMargin: '0px',
    };

    const onEnterZone = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && scrollableAreaRef.current) {
          if (scrollableAreaRef.current.scrollHeight > scrollableAreaRef.current.clientHeight) {
            callback(entry);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onEnterZone, options);
    const target = scrollableAreaRef.current.querySelector(selectorToWatch);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [skipWhen, callback, selectorToWatch]);
};
