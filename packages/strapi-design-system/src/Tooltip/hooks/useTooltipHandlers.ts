import { useRef, useState, useEffect } from 'react';

export const useTooltipHandlers = (delay: number) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (typeof timerRef.current === 'number') {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const onFocus = () => {
    setVisible(true);
  };

  const onBlur = () => {
    setVisible(false);
  };

  const onMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const onMouseLeave = () => {
    clearTimer();
    setVisible(false);
  };

  return { visible, onFocus, onBlur, onMouseEnter, onMouseLeave };
};
