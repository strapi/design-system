/**
 * TODO: This should be moved to the `hooks` folder
 */
import { useRef } from 'react';
import { genId } from './genId';

export const useId = (initialId?: string) => {
  const idRef = useRef(initialId || genId());

  return idRef.current;
};
