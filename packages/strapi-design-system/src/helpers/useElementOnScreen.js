import { useRef, useState, useEffect } from 'react';

export const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setVisible] = useState(true);

  const callback = ([entry]) => {
    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const containerEl = containerRef.current;
    const observer = new IntersectionObserver(callback, options);

    if (containerEl) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerEl) {
        observer.disconnect();
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
