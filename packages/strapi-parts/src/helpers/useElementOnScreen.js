import { useRef, useState, useEffect } from 'react';

export const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const callback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.disconnect();
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
