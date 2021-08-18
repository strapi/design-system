import { useRef, useState, useEffect } from 'react';

export const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const callback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
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
