import { useRef, useState, useEffect } from 'react';

export const useTooltipHandlers = (delay) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef();

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
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
