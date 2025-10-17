import { ReactNode, FC, useRef, useState, useEffect, startTransition, useMemo, Children, useCallback } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { Box } from '../../primitives';

interface VirtualizedListProps {
  children?: ReactNode;
  estimatedItemSize?: number;
  overscan?: number;
  // Optional: lazy rendering support
  itemCount?: number;
  renderItem?: (index: number) => ReactNode;
}

/**
 * VirtualizedList - Wraps Combobox children in a virtualizer for performance
 * This component should be used inside ScrollArea to virtualize the list
 *
 * Two modes:
 * 1. Children mode (default): Pass children directly
 * 2. Lazy mode: Pass itemCount + renderItem for maximum performance
 */
export const VirtualizedList: FC<VirtualizedListProps> = ({
  children,
  estimatedItemSize = 40,
  overscan = 10,
  itemCount,
  renderItem,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (typeof startTransition === 'function') {
      startTransition(() => {
        if (isMountedRef.current) {
          setIsReady(true);
        }
      });
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Convert children to array only once and cache it (for children mode)
  const childArray = useMemo(() => {
    if (renderItem && itemCount !== undefined) {
      // Lazy mode: no children array needed
      return [];
    }
    return Children.toArray(children);
  }, [children, renderItem, itemCount]);

  const count = itemCount ?? childArray.length;

  const virtualizer = useVirtualizer({
    count,
    // parentRef is the inner container; the scroll element is its closest scrollable ancestor
    getScrollElement: () => parentRef.current ?? null,
    estimateSize: useCallback(() => estimatedItemSize, [estimatedItemSize]),
    overscan,
    // Optimize scroll performance
    scrollMargin: 0,
    // Don't measure elements dynamically - use fixed size
    measureElement: undefined,
    // Use lanes for better performance with large lists
    lanes: 1,
  });

  // Get virtual items - this updates as you scroll
  const virtualItems = isReady && isMountedRef.current ? virtualizer.getVirtualItems() : [];

  // Show minimal content until ready to prevent blocking
  if (!isReady) {
    // Small placeholder while React.startTransition finishes to avoid huge blank areas
    return <Box ref={parentRef} height="40px" width="100%" position="relative" />;
  }

  return (
    <Box
      ref={parentRef}
      height={`${virtualizer.getTotalSize() > 0 ? virtualizer.getTotalSize() : 0}px`}
      width="100%"
      position="relative"
      data-testid="virtualized-list"
      style={{
        willChange: 'transform',
      }}
    >
      {virtualItems.map((virtualItem) => {
        // Lazy mode: render on-demand
        const child = renderItem ? renderItem(virtualItem.index) : childArray[virtualItem.index];

        return (
          <Box
            key={virtualItem.key}
            data-index={virtualItem.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translate3d(0, ${virtualItem.start}px, 0)`,
            }}
          >
            {child}
          </Box>
        );
      })}
    </Box>
  );
};
