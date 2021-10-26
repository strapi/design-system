import { useEffect } from 'react';

export const useResizeObserver = (source, onResize) => {
  useEffect(() => {
    const resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(source.current);

    return () => {
      resizeObs.disconnect();
    };
  }, []);
};
