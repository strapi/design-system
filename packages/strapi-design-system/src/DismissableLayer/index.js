import * as React from 'react';
import PropTypes from 'prop-types';

export const DismissableLayer = ({ children, className, onEscapeKeyDown, onPointerDownOutside }) => {
  const layerRef = React.useRef(null);
  const onEscapeKeyDownHandler = useCallbackRef(onEscapeKeyDown);
  const onPointerDownOutsideHandler = useCallbackRef(onPointerDownOutside);

  React.useEffect(() => {
    /**
     * @type {import('react').KeyboardEventHandler<Document>}
     */
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onEscapeKeyDownHandler(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscapeKeyDownHandler]);

  React.useEffect(() => {
    /**
     * @type {import('react').PointerEventHandler<Document>}
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

DismissableLayer.propTypes = {
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
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () =>
      (...args) =>
        callbackRef.current?.(...args),
    [],
  );
}
