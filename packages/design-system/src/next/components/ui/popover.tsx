import * as React from 'react';

import { cn } from '@/lib/utils';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';

const Popover = (props: PopoverPrimitive.Root.Props) => <PopoverPrimitive.Root data-slot="popover" {...props} />;

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverPrimitive.Trigger.Props>((props, ref) => {
  return <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />;
});
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverPrimitive.Close.Props>((props, ref) => {
  return <PopoverPrimitive.Close ref={ref} data-slot="popover-close" {...props} />;
});
PopoverClose.displayName = 'PopoverClose';

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    | 'side'
    | 'align'
    | 'sideOffset'
    | 'alignOffset'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
    | 'sticky'
  > & {
    /** Classes for the positioner wrapper rather than the popup itself. */
    positionerClassName?: string;
  };

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      positionerClassName,
      side = 'bottom',
      align = 'center',
      sideOffset = 4,
      alignOffset,
      collisionAvoidance,
      collisionBoundary,
      collisionPadding,
      sticky,
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          data-slot="popover-positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionAvoidance={collisionAvoidance}
          collisionBoundary={collisionBoundary}
          collisionPadding={collisionPadding}
          sticky={sticky}
          className={cn('z-50', positionerClassName)}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            data-slot="popover-content"
            className={cn(
              'min-w-[8rem] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none',
              className,
            )}
            {...props}
          />
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
