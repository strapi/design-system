import * as React from 'react';

import { cn } from '@/lib/utils';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

/**
 * A segmented control for the new system, built with Tailwind CSS v4 and shadcn.
 *
 * It is a radio group under the hood (`@base-ui` RadioGroup + Radio), not a toggle group: exactly
 * one item is always selected and it can never be deselected to an empty state. It is styled as a
 * neutral "pill" track whose selected segment lifts onto a surface — the right shape for a small,
 * always-answered choice such as publish / unpublish shown inline in a table.
 */

const SegmentedControl = React.forwardRef<HTMLDivElement, RadioGroupPrimitive.Props>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitive
        ref={ref}
        data-slot="segmented-control"
        className={cn(
          'inline-flex w-fit items-center gap-0.5 rounded-md border border-border bg-muted p-0.5',
          className,
        )}
        {...props}
      />
    );
  },
);
SegmentedControl.displayName = 'SegmentedControl';

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, RadioPrimitive.Root.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadioPrimitive.Root
        ref={ref}
        data-slot="segmented-control-item"
        className={cn(
          'inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-sm px-2.5 text-sm font-medium whitespace-nowrap',
          'text-muted-foreground outline-none transition-colors select-none',
          'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          'data-[checked]:cursor-default data-[checked]:bg-background data-[checked]:text-foreground data-[checked]:shadow-xs',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      >
        {children}
      </RadioPrimitive.Root>
    );
  },
);
SegmentedControlItem.displayName = 'SegmentedControlItem';

export { SegmentedControl, SegmentedControlItem };
