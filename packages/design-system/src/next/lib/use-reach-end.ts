import * as React from 'react';

/**
 * Calls `onReachEnd` when a sentinel element at the end of a scroll container comes into view, like the
 * legacy `useIntersection` hook. It fires only when the container overflows, so a short list does not
 * load the next page on open.
 *
 * Put `rootRef` on the element that scrolls and `sentinelRef` on an empty element after the last item.
 * Both are callback refs, so a popup that mounts later still gets observed.
 */
function useReachEnd(onReachEnd: ((entry: IntersectionObserverEntry) => void) | undefined) {
  const [root, setRoot] = React.useState<HTMLElement | null>(null);
  const [sentinel, setSentinel] = React.useState<HTMLElement | null>(null);

  const callbackRef = React.useRef(onReachEnd);

  React.useEffect(() => {
    callbackRef.current = onReachEnd;
  });

  const enabled = onReachEnd !== undefined;

  React.useEffect(() => {
    if (!enabled || !root || !sentinel || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && root.scrollHeight > root.clientHeight) {
            callbackRef.current?.(entry);
          }
        });
      },
      { root, rootMargin: '0px' },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [enabled, root, sentinel]);

  return { rootRef: setRoot, sentinelRef: setSentinel, enabled };
}

/**
 * Merges refs into one stable callback ref.
 */
function useMergedRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback((value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  }, refs);
}

export { useReachEnd, useMergedRefs };
