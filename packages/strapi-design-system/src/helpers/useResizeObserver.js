import { useLayoutEffect } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

export const useResizeObserver = (sources, onResize) => {
  const handleResize = useCallbackRef(onResize);

  useLayoutEffect(() => {
    const resizeObs = new ResizeObserver(handleResize);

    if (Array.isArray(sources)) {
      sources.forEach((source) => {
        if (source.current) {
          resizeObs.observe(source.current);
        }
      });
    } else if (sources.current) {
      resizeObs.observe(sources.current);
    }

    return () => {
      resizeObs.disconnect();
    };
  }, [sources, handleResize]);
};
