import { useEffect } from 'react';

export const useResizeObserver = (sources, onResize) => {
  useEffect(() => {
    const resizeObs = new ResizeObserver(onResize);
    if (Array.isArray(sources)) {
      sources.map((source) => {
        if (source.current) {
          resizeObs.observe(source.current);
        }
      });
    } else {
      if (sources.current) {
        resizeObs.observe(sources.current);
      }
    }

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
