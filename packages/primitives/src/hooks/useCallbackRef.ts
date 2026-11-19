import * as React from 'react';

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
// oxlint-disable-next-line typescript/no-explicit-any -- The args need any. unknown[] rejects typed callbacks. never[] blocks calls to untyped inline callbacks
function useCallbackRef<T extends (...args: any[]) => unknown>(callback: T | undefined): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export { useCallbackRef };
