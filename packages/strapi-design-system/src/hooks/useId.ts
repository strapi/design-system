import * as React from 'react';

// Inspired by radix-ui useId hook https://github.com/radix-ui/primitives/blob/main/packages/react/id/src/id.tsx
// We `toString()` to prevent bundlers from trying to `import { useId } from 'react';`
const useReactId = (React as any)['useId'.toString()] || (() => undefined);
let count = 0;

export const useId = (initialId?: string | number | undefined): string => {
  const [id, setId] = React.useState(useReactId());

  // React versions older than 18 will have client-side ids only.
  React.useLayoutEffect(() => {
    if (!initialId) setId((reactId) => reactId ?? String(count++));
  }, [initialId]);

  return initialId?.toString() ?? (id || '');
};
