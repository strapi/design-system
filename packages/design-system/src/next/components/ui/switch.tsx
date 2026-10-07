import * as React from 'react';

import { cn } from '@/lib/utils';
import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

interface SwitchProps extends Omit<SwitchPrimitive.Root.Props, 'className' | 'children'> {
  className?: string;
  /**
   * The text shown next to the switch when it is on, with `visibleLabels`.
   * @default "On"
   */
  onLabel?: string;
  /**
   * The text shown next to the switch when it is off, with `visibleLabels`.
   * @default "Off"
   */
  offLabel?: string;
  /**
   * Shows `onLabel` or `offLabel` next to the switch. The text is hidden from assistive technology, which reads
   * the state from the switch role.
   */
  visibleLabels?: boolean;
}

/**
 * An on / off switch: red when off, green when on. Give it an accessible name with `aria-label` or a label.
 */
const Switch = React.forwardRef<HTMLElement, SwitchProps>(
  (
    {
      className,
      visibleLabels,
      onLabel = 'On',
      offLabel = 'Off',
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(Boolean(defaultChecked));
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : uncontrolledChecked;

    return (
      <div data-slot="switch-wrapper" className="flex items-center gap-3">
        <SwitchPrimitive.Root
          ref={ref}
          data-slot="switch"
          // A native button, like the legacy Radix control, so a <label for> names this element only
          nativeButton
          render={<button type="button" />}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(nextChecked, eventDetails) => {
            onCheckedChange?.(nextChecked, eventDetails);

            if (!isControlled) {
              setUncontrolledChecked(nextChecked);
            }
          }}
          className={cn(
            'm-0 inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-3xl border-0 bg-danger-500 p-0 outline-none motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-out',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
            'data-checked:bg-success-500 data-disabled:cursor-not-allowed data-disabled:bg-neutral-300',
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className="block size-4 translate-x-1 rounded-full bg-neutral-0 data-checked:translate-x-5 motion-safe:transition-transform motion-safe:duration-100 motion-safe:ease-in-out"
          />
        </SwitchPrimitive.Root>
        {visibleLabels ? (
          <span
            aria-hidden
            data-slot="switch-label"
            data-disabled={disabled ? '' : undefined}
            data-state={checked ? 'checked' : 'unchecked'}
            className="text-base text-danger-600 data-[disabled]:text-neutral-500 data-[state=checked]:not-data-[disabled]:text-success-600 medium:text-sm"
          >
            {checked ? onLabel : offLabel}
          </span>
        ) : null}
      </div>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
