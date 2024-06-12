import * as React from 'react';

export const usePrev = <T>(value: T): T | undefined => {
  const ref = React.useRef<T>(undefined);

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
