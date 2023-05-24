import { RefObject, useLayoutEffect } from 'react';

import { useCallbackRef } from '@strapi/ui-primitives';

export const useResizeObserver = (
  sources: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  onResize: ResizeObserverCallback,
) => {
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
