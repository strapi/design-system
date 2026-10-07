import * as React from 'react';

import { useRender } from '@base-ui/react/use-render';

import { useComposedRefs } from '../../../hooks/useComposeRefs';
import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect';

/* -------------------------------------------------------------------------------------------------
 * Layer stack
 * -----------------------------------------------------------------------------------------------*/

/**
 * Every mounted layer, in mount order. The last one is the highest. Only the highest layer reacts to
 * Escape, and a layer that disables outside pointer events blocks the layers under it
 */
interface Layer {
  disableOutsidePointerEvents: boolean;
  parent: Layer | null;
}

const isDescendantOf = (layer: Layer, ancestor: Layer) => {
  for (let current = layer.parent; current; current = current.parent) {
    if (current === ancestor) return true;
  }

  return false;
};

/**
 * Children mount before their parent, so a parent goes under its nested layers that are already in
 * the stack, not on top of them
 */
const insertLayer = (layer: Layer) => {
  const next = [...layers];
  const firstDescendantIndex = next.findIndex((item) => isDescendantOf(item, layer));

  if (firstDescendantIndex === -1) {
    next.push(layer);
  } else {
    next.splice(firstDescendantIndex, 0, layer);
  }

  return next;
};

const LayerContext = React.createContext<Layer | null>(null);

let layers: Layer[] = [];
let version = 0;
let originalBodyPointerEvents: string | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getVersion = () => version;

const highestBlockingIndex = () => {
  for (let index = layers.length - 1; index >= 0; index--) {
    if (layers[index].disableOutsidePointerEvents) return index;
  }

  return -1;
};

const syncBodyPointerEvents = () => {
  const isBlocking = highestBlockingIndex() !== -1;

  if (isBlocking && originalBodyPointerEvents === null) {
    originalBodyPointerEvents = document.body.style.pointerEvents;
    document.body.style.pointerEvents = 'none';
  } else if (!isBlocking && originalBodyPointerEvents !== null) {
    document.body.style.pointerEvents = originalBodyPointerEvents;
    originalBodyPointerEvents = null;
  }
};

const updateLayers = (next: Layer[]) => {
  layers = next;
  version++;
  syncBodyPointerEvents();
  listeners.forEach((listener) => listener());
};

/* -------------------------------------------------------------------------------------------------
 * DismissibleLayer
 * -----------------------------------------------------------------------------------------------*/

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;
type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

interface DismissibleLayerProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * If true, the elements outside the layer ignore the pointer while the layer is mounted, so a click
   * outside only dismisses the layer.
   * @default false
   */
  disableOutsidePointerEvents?: boolean;
  /**
   * Called when the user presses Escape and this layer is the highest one. `event.preventDefault()`
   * keeps the layer open.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  /**
   * Called on a pointer down outside the layer. `event.preventDefault()` keeps the layer open, and
   * `event.detail.originalEvent` is the native event.
   */
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  /**
   * Called when the focus moves outside the layer. `event.preventDefault()` keeps the layer open.
   */
  onFocusOutside?: (event: FocusOutsideEvent) => void;
  /**
   * Called on a pointer down or a focus outside the layer, after the more specific handler.
   */
  onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void;
  /**
   * Called when the layer should close, unless a handler above called `event.preventDefault()`.
   */
  onDismiss?: () => void;
  /**
   * Replaces the `<div>` with another element. It takes the place of the legacy `asChild` prop.
   */
  render?: useRender.RenderProp;
}

const createOutsideEvent = <E extends Event>(name: string, originalEvent: E) =>
  new CustomEvent<{ originalEvent: E }>(name, { cancelable: true, detail: { originalEvent } });

/**
 * A layer that calls `onDismiss` on Escape, on a pointer down outside it and when the focus leaves it.
 *
 * Nested layers stack: Escape closes the highest one only. A child rendered in a portal still counts as
 * inside, because the check follows the React tree.
 */
const DismissibleLayer = React.forwardRef<HTMLDivElement, DismissibleLayerProps>(
  (
    {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      onPointerDownCapture,
      onFocusCapture,
      onBlurCapture,
      render,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(nodeRef, forwardedRef);
    const parentLayer = React.useContext(LayerContext);
    const layerRef = React.useRef<Layer>({ disableOutsidePointerEvents, parent: parentLayer });

    // The handlers live in a ref, so the document listeners do not change when the props do
    const handlersRef = React.useRef({
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
    });
    handlersRef.current = { onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss };

    // React events bubble through portals, so these flags tell whether the event came from the React tree
    const isPointerInsideReactTreeRef = React.useRef(false);
    const isFocusInsideReactTreeRef = React.useRef(false);

    React.useSyncExternalStore(subscribe, getVersion, getVersion);

    const index = layers.indexOf(layerRef.current);
    const blockingIndex = highestBlockingIndex();
    const isBodyPointerEventsDisabled = blockingIndex !== -1;
    const isPointerEventsEnabled = index >= blockingIndex;

    useIsomorphicLayoutEffect(() => {
      const layer = layerRef.current;
      updateLayers(insertLayer(layer));

      return () => {
        updateLayers(layers.filter((item) => item !== layer));
      };
    }, []);

    useIsomorphicLayoutEffect(() => {
      if (layerRef.current.disableOutsidePointerEvents === disableOutsidePointerEvents) return;

      layerRef.current.disableOutsidePointerEvents = disableOutsidePointerEvents;
      updateLayers([...layers]);
    }, [disableOutsidePointerEvents]);

    React.useEffect(() => {
      const ownerDocument = nodeRef.current?.ownerDocument ?? document;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;

        const isHighestLayer = layers.indexOf(layerRef.current) === layers.length - 1;

        if (!isHighestLayer) return;

        handlersRef.current.onEscapeKeyDown?.(event);

        if (!event.defaultPrevented && handlersRef.current.onDismiss) {
          event.preventDefault();
          handlersRef.current.onDismiss();
        }
      };

      const handlePointerDown = (event: PointerEvent) => {
        const isInside = isPointerInsideReactTreeRef.current;
        isPointerInsideReactTreeRef.current = false;

        if (isInside || !event.target) return;

        // A layer under one that blocks outside pointer events does not react
        if (layers.indexOf(layerRef.current) < highestBlockingIndex()) return;

        const outsideEvent = createOutsideEvent('dismissibleLayer.pointerDownOutside', event);

        handlersRef.current.onPointerDownOutside?.(outsideEvent);
        handlersRef.current.onInteractOutside?.(outsideEvent);

        if (!outsideEvent.defaultPrevented) {
          handlersRef.current.onDismiss?.();
        }
      };

      const handleFocusIn = (event: FocusEvent) => {
        if (isFocusInsideReactTreeRef.current || !event.target) return;

        const outsideEvent = createOutsideEvent('dismissibleLayer.focusOutside', event);

        handlersRef.current.onFocusOutside?.(outsideEvent);
        handlersRef.current.onInteractOutside?.(outsideEvent);

        if (!outsideEvent.defaultPrevented) {
          handlersRef.current.onDismiss?.();
        }
      };

      ownerDocument.addEventListener('keydown', handleKeyDown, { capture: true });
      ownerDocument.addEventListener('focusin', handleFocusIn);

      // Waits a tick, so the pointer down that mounted the layer does not dismiss it at once
      const timerId = window.setTimeout(() => {
        ownerDocument.addEventListener('pointerdown', handlePointerDown);
      }, 0);

      return () => {
        window.clearTimeout(timerId);
        ownerDocument.removeEventListener('keydown', handleKeyDown, { capture: true });
        ownerDocument.removeEventListener('focusin', handleFocusIn);
        ownerDocument.removeEventListener('pointerdown', handlePointerDown);
      };
    }, []);

    const element = useRender({
      defaultTagName: 'div',
      render,
      ref,
      props: {
        'data-slot': 'dismissible-layer',
        ...props,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? (isPointerEventsEnabled ? 'auto' : 'none') : undefined,
          ...style,
        },
        onPointerDownCapture: (event: React.PointerEvent<HTMLDivElement>) => {
          isPointerInsideReactTreeRef.current = true;
          onPointerDownCapture?.(event);
        },
        onFocusCapture: (event: React.FocusEvent<HTMLDivElement>) => {
          isFocusInsideReactTreeRef.current = true;
          onFocusCapture?.(event);
        },
        onBlurCapture: (event: React.FocusEvent<HTMLDivElement>) => {
          isFocusInsideReactTreeRef.current = false;
          onBlurCapture?.(event);
        },
      },
    });

    return <LayerContext.Provider value={layerRef.current}>{element}</LayerContext.Provider>;
  },
);

DismissibleLayer.displayName = 'DismissibleLayer';

export { DismissibleLayer };
export type { DismissibleLayerProps, PointerDownOutsideEvent, FocusOutsideEvent };
