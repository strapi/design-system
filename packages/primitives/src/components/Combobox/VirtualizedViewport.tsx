import * as React from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Primitive } from '@radix-ui/react-primitive';
import { useVirtualizer } from '@tanstack/react-virtual';

import type { ComponentPropsWithoutRef } from '@radix-ui/react-primitive';

/**
 * VirtualizedViewport - Renders only visible items for performance optimization
 * Used when Combobox/Select has many items (>100)
 */

type VirtualizedViewportElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>;

export interface VirtualizedViewportProps extends PrimitiveDivProps {
  /**
   * Estimated size of each item in pixels
   * @default 40
   */
  estimatedItemSize?: number;
  /**
   * Number of items to render outside the visible area
   * @default 5
   */
  overscan?: number;
  /**
   * Callback to get the count of total items
   */
  getItemCount: () => number;
  /**
   * Callback when viewport ref changes
   */
  onViewportChange?: (node: VirtualizedViewportElement | null) => void;
}

export const VirtualizedViewport = React.forwardRef<VirtualizedViewportElement, VirtualizedViewportProps>(
  ({ children, estimatedItemSize = 40, overscan = 5, getItemCount, onViewportChange, ...props }, forwardedRef) => {
    const parentRef = React.useRef<HTMLDivElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, parentRef, onViewportChange);

    // Get array of children to virtualize
    const childArray = React.useMemo(() => React.Children.toArray(children), [children]);

    const virtualizer = useVirtualizer({
      count: getItemCount(),
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimatedItemSize,
      overscan,
    });

    const virtualItems = virtualizer.getVirtualItems();

    return (
      <>
        {/* Hide scrollbars cross-browser and enable momentum scroll for touch devices */}
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `[data-radix-combobox-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-combobox-viewport]::-webkit-scrollbar{display:none}`,
          }}
        />
        <Primitive.div
          data-radix-combobox-viewport=""
          role="presentation"
          {...props}
          ref={composedRefs}
          style={{
            position: 'relative',
            flex: 1,
            overflow: 'auto',
            ...props.style,
          }}
        >
          {/* Total height container */}
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Only render visible items */}
            {virtualItems.map((virtualItem) => {
              const child = childArray[virtualItem.index];
              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {child}
                </div>
              );
            })}
          </div>
        </Primitive.div>
      </>
    );
  },
);

VirtualizedViewport.displayName = 'VirtualizedViewport';
