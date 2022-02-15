import { useEffect } from 'react';

export const useResizeObserver = (sources, onResize) => {
  useEffect(() => {
    const resizeObs = new ResizeObserver(onResize);
    if (Array.isArray(sources)) {
      sources.map((source) => resizeObs.observe(source.current));
    } else {
      resizeObs.observe(sources.current);
    }

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
