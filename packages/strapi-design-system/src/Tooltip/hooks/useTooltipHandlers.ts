import * as React from 'react';

export const useTooltipHandlers = (delay: number) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (typeof timerRef.current === 'number') {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  React.useEffect(() => {
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
