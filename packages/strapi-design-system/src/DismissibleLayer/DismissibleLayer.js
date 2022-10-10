import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

export const DismissibleLayer = ({ children, className, onEscapeKeyDown, onPointerDownOutside }) => {
  const layerRef = useRef(null);
  const onEscapeKeyDownHandler = useCallbackRef(onEscapeKeyDown);
  const onPointerDownOutsideHandler = useCallbackRef(onPointerDownOutside);

  useEffect(() => {
    /**
     * @type {(event: KeyboardEvent) => void}
     */
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onEscapeKeyDownHandler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscapeKeyDownHandler]);

  useEffect(() => {
    /**
     * @type {(event: PointerEvent) => void}
     */
    const handlePointerDownOutside = (event) => {
      if (layerRef.current && !layerRef.current.contains(event.target)) {
        onPointerDownOutsideHandler();
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);

    return () => document.removeEventListener('pointerdown', handlePointerDownOutside);
  }, [onPointerDownOutsideHandler]);

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
};

DismissibleLayer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onEscapeKeyDown: PropTypes.func,
  onPointerDownOutside: PropTypes.func,
};

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 *
 * Stolen from @radix-ui/react-use-callback-ref
 */
function useCallbackRef(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(
    () =>
      (...args) =>
        callbackRef.current?.(...args),
    [],
  );
}
