import React, { useEffect, useRef } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
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
      /**
       * Because certain elements that live inside modals e.g. Selects
       * render their dropdowns in portals the `layerRef.current.contains(event.target)` fails.
       *
       * Therefore we check the closest portal of the DimissibleLayer (which we're trying to close)
       * and the event that _may_ prematurely close the layer and see if they are equal.
       */
      const dismissibleLayersReactPortal = layerRef.current.closest('[data-react-portal]');
      const eventsReactPortal = event.target.closest('[data-react-portal]');

      if (
        layerRef.current &&
        !layerRef.current.contains(event.target) &&
        dismissibleLayersReactPortal === eventsReactPortal
      ) {
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

DismissibleLayer.defaultProps = {
  className: undefined,
};

DismissibleLayer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onEscapeKeyDown: PropTypes.func.isRequired,
  onPointerDownOutside: PropTypes.func.isRequired,
};
