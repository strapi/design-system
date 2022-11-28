/**
 * TODO: This should be moved to the `hooks` folder
 */
import { useRef } from 'react';
import { genId } from './genId';

export const useId = (prefix: string, initialId?: string) => {
  const idRef = useRef(initialId || `${prefix}-${genId()}`);

  return idRef.current;
};
