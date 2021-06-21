import { useEffect } from 'react';

export const useIntersection = (scrollableAreaRef, callback, { selectorToWatch, skipWhen = false }) => {
  useEffect(() => {
    if (skipWhen) return;

    const options = {
      root: scrollableAreaRef.current,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const onEnterZone = (entries, _observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
  }, [skipWhen]);
};
