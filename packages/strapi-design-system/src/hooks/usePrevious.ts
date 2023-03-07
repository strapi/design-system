import { useRef, useEffect } from 'react';

export const usePrevious = <TValue>(value: TValue): TValue | undefined => {
  const ref = useRef<TValue>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
