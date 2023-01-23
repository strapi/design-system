import React, { useRef } from 'react';
import { genId } from './genId';

// Inspired by radix-ui useId hook https://github.com/radix-ui/primitives/blob/main/packages/react/id/src/id.tsx
const useReactId = React['useId'.toString()] || (() => undefined);

export const useId = (initialId?: string) => {
  const reactId = useReactId();
  // If no initialId and no reactId, then we fallback to our own getId implementation
  // To support of React versions older than 18
  const idRef = useRef<string>(initialId || reactId || genId());

  return idRef.current;
};
