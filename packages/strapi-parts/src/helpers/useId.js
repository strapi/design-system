import { useRef } from 'react';
import { genId } from './genId';

export const useId = (prefix) => {
  const idRef = useRef(`${prefix}-${genId()}`);

  return idRef.current;
};
