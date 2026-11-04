import * as React from 'react';

import { cn } from '@/lib/utils';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

type IconProps = React.SVGProps<SVGSVGElement>;

const CaretDown = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 256 256" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
  </svg>
);

/**
 * The generic single/multi-select combobox for the new system, a styled wrapper over the `@base-ui`
 * Combobox. `Combobox` (the root) keeps base-ui's generics, so it is re-exported as-is; the other
 * parts add the Tailwind styling.
 */
const Combobox = ComboboxPrimitive.Root;

const ComboboxValue = ComboboxPrimitive.Value;

const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxPrimitive.Input.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Input
        ref={ref}
        data-slot="combobox-input"
        className={cn(
          'h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none',
          'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);
ComboboxInput.displayName = 'ComboboxInput';

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxPrimitive.Trigger.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Trigger
        ref={ref}
        data-slot="combobox-trigger"
        className={cn(
          'flex size-6 items-center justify-center rounded-sm text-muted-foreground outline-none',
          'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        {...props}
      >
        {children ?? (
          <ComboboxPrimitive.Icon>
            <CaretDown className="size-4" />
          </ComboboxPrimitive.Icon>
        )}
      </ComboboxPrimitive.Trigger>
    );
  },
);
ComboboxTrigger.displayName = 'ComboboxTrigger';

const ComboboxClear = React.forwardRef<HTMLButtonElement, ComboboxPrimitive.Clear.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Clear
        ref={ref}
        data-slot="combobox-clear"
        className={cn(
          'flex size-6 items-center justify-center rounded-sm text-muted-foreground outline-none',
          'hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        {...props}
      >
        {children ?? <XIcon className="size-3.5" />}
      </ComboboxPrimitive.Clear>
    );
  },
);
ComboboxClear.displayName = 'ComboboxClear';

type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset'> & {
    positionerClassName?: string;
  };

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ className, positionerClassName, side = 'bottom', align = 'start', sideOffset = 4, alignOffset, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner
          data-slot="combobox-positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn('z-50', positionerClassName)}
        >
          <ComboboxPrimitive.Popup
            ref={ref}
            data-slot="combobox-content"
            className={cn(
              'max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto overflow-x-hidden',
              'rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none',
              className,
            )}
            {...props}
          />
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    );
  },
);
ComboboxContent.displayName = 'ComboboxContent';

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Empty.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Empty
        ref={ref}
        data-slot="combobox-empty"
        className={cn('px-2 py-1.5 text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
ComboboxEmpty.displayName = 'ComboboxEmpty';

const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxPrimitive.List.Props>((props, ref) => {
  return <ComboboxPrimitive.List ref={ref} data-slot="combobox-list" {...props} />;
});
ComboboxList.displayName = 'ComboboxList';

const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Item.Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Item
        ref={ref}
        data-slot="combobox-item"
        className={cn(
          'flex cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none',
          'data-[highlighted]:bg-muted data-[highlighted]:text-foreground',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Item>
    );
  },
);
ComboboxItem.displayName = 'ComboboxItem';

const ComboboxItemIndicator = ({ className, children, ...props }: ComboboxPrimitive.ItemIndicator.Props) => {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      className={cn('flex size-4 items-center justify-center text-primary', className)}
      {...props}
    >
      {children ?? <CheckIcon className="size-4" />}
    </ComboboxPrimitive.ItemIndicator>
  );
};

const ComboboxGroup = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Group.Props>((props, ref) => {
  return <ComboboxPrimitive.Group ref={ref} data-slot="combobox-group" {...props} />;
});
ComboboxGroup.displayName = 'ComboboxGroup';

const ComboboxGroupLabel = React.forwardRef<HTMLDivElement, ComboboxPrimitive.GroupLabel.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ComboboxPrimitive.GroupLabel
        ref={ref}
        data-slot="combobox-group-label"
        className={cn('px-2 py-1.5 text-xs font-medium text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
ComboboxGroupLabel.displayName = 'ComboboxGroupLabel';

const ComboboxSeparator = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Separator.Props>(
  ({ className, ...props }, ref) => {
    return (
      <ComboboxPrimitive.Separator
        ref={ref}
        data-slot="combobox-separator"
        className={cn('-mx-1 my-1 h-px bg-border', className)}
        {...props}
      />
    );
  },
);
ComboboxSeparator.displayName = 'ComboboxSeparator';

export {
  Combobox,
  ComboboxValue,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
};
