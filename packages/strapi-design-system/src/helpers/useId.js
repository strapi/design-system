import { useRef } from 'react';
import { genId } from './genId';

export const useId = (prefix, initialId) => {
  const idRef = useRef(initialId || `${prefix}-${genId()}`);

  return idRef.current;
};
