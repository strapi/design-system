import { useEffect } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

export const useIntersection = (scrollableAreaRef, callback, { selectorToWatch, skipWhen = false }) => {
  const handleIntersection = useCallbackRef(callback);

  useEffect(() => {
    if (skipWhen) return;

    const options = {
      root: scrollableAreaRef.current,
      rootMargin: '0px',
    };

    const onEnterZone = (entries) => {
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

    observer.observe(target);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [skipWhen, handleIntersection, selectorToWatch, scrollableAreaRef]);
};
