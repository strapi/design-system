/**
 * An internal fork of Radix UI's `Collection` component.
 *
 * We've added a subscription API to allow us to subscribe to changes in the collection via the useCollection hook.
 */
import * as React from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { Slot } from '@radix-ui/react-slot';

import type * as Radix from '@radix-ui/react-primitive';

type SlotProps = Radix.ComponentPropsWithoutRef<typeof Slot>;
type CollectionElement = HTMLElement;
interface CollectionProps extends SlotProps {
  scope: any;
}

interface CollectionProviderProps {
  children?: React.ReactNode;
  scope: any;
}

// We have resorted to returning slots directly rather than exposing primitives that can then
// be slotted like `<CollectionItem as={Slot}>…</CollectionItem>`.
// This is because we encountered issues with generic types that cannot be statically analysed
// due to creating them dynamically via createCollection.

function createCollection<ItemElement extends HTMLElement, ItemData = object>(name: string) {
  /* -----------------------------------------------------------------------------------------------
   * CollectionProvider
   * ---------------------------------------------------------------------------------------------*/

  const PROVIDER_NAME = `${name}CollectionProvider`;
  const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);

  type ItemMapValue = { ref: React.RefObject<ItemElement> } & ItemData;

  type ContextValue = {
    collectionRef: React.RefObject<CollectionElement | null>;
    itemMap: Map<React.RefObject<ItemElement>, ItemMapValue>;
    listeners: Set<Listener>;
  };

  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext<ContextValue>(PROVIDER_NAME, {
    collectionRef: { current: null },
    itemMap: new Map(),
    listeners: new Set<Listener>(),
  });

  const CollectionProvider = (props: CollectionProviderProps) => {
    const { scope, children } = props;
    const ref = React.useRef<CollectionElement>(null);
    const itemMap = React.useRef<ContextValue['itemMap']>(new Map()).current;
    const listeners = React.useRef<ContextValue['listeners']>(new Set()).current;

    return (
      <CollectionProviderImpl scope={scope} itemMap={itemMap} collectionRef={ref} listeners={listeners}>
        {children}
      </CollectionProviderImpl>
    );
  };

  CollectionProvider.displayName = PROVIDER_NAME;

  /* -----------------------------------------------------------------------------------------------
   * CollectionSlot
   * ---------------------------------------------------------------------------------------------*/

  const COLLECTION_SLOT_NAME = `${name}CollectionSlot`;

  const CollectionSlot = React.forwardRef<CollectionElement, CollectionProps>((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);

    return <Slot ref={composedRefs}>{children}</Slot>;
  });

  CollectionSlot.displayName = COLLECTION_SLOT_NAME;

  /* -----------------------------------------------------------------------------------------------
   * CollectionItem
   * ---------------------------------------------------------------------------------------------*/

  const ITEM_SLOT_NAME = `${name}CollectionItemSlot`;
  const ITEM_DATA_ATTR = 'data-radix-collection-item';

  type CollectionItemSlotProps = ItemData & {
    children: React.ReactNode;
    scope: any;
  };

  const CollectionItemSlot = React.forwardRef<ItemElement, CollectionItemSlotProps>((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = React.useRef<ItemElement>(null!);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);

    React.useEffect(() => {
      const previousMap = Array.from(context.itemMap.values());
      context.itemMap.set(ref, { ref, ...(itemData as unknown as ItemData) });

      context.listeners.forEach((listener) => listener(Array.from(context.itemMap.values()), previousMap));

      return () => {
        const previousMap = Array.from(context.itemMap.values());
        context.itemMap.delete(ref);
        context.listeners.forEach((listener) => listener(Array.from(context.itemMap.values()), previousMap));
      };
    });

    return (
      <Slot {...{ [ITEM_DATA_ATTR]: '' }} ref={composedRefs}>
        {children}
      </Slot>
    );
  });

  CollectionItemSlot.displayName = ITEM_SLOT_NAME;

  /* -----------------------------------------------------------------------------------------------
   * useCollection
   * ---------------------------------------------------------------------------------------------*/

  type Listener = (newState: ItemMapValue[], prevState: ItemMapValue[]) => void;

  function useCollection(scope: any) {
    const context = useCollectionContext(`${name}CollectionConsumer`, scope);

    const getItems = React.useCallback(() => {
      const collectionNode = context.collectionRef.current;

      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current!) - orderedNodes.indexOf(b.ref.current!),
      );

      return orderedItems;
    }, [context.collectionRef, context.itemMap]);

    const subscribe = React.useCallback(
      (listener: Listener) => {
        context.listeners.add(listener);

        // Unsubscribe
        return () => context.listeners.delete(listener);
      },
      [context.listeners],
    );

    return { getItems, subscribe };
  }

  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection,
    createCollectionScope,
  ] as const;
}

export { createCollection };
export type { CollectionProps, CollectionProviderProps };
