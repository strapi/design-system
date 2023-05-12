import { useRef, useState, useEffect } from 'react';

export const useElementOnScreen = <TElement extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
): [containerRef: React.RefObject<TElement>, isVisible: boolean] => {
  const containerRef = useRef<TElement>(null);

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const callback: IntersectionObserverCallback = ([entry]) => {
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
