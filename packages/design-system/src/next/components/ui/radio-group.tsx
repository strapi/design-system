import * as React from 'react';

import { cn } from '@/lib/utils';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

type RadioGroupProps = Omit<RadioGroupPrimitive.Props<string>, 'className'> & { className?: string };

/**
 * A group of radio buttons, stacked with a 12px gap. The arrow keys move the selection.
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive
      ref={ref}
      data-slot="radio-group"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends Omit<RadioPrimitive.Root.Props<string>, 'className'> {
  className?: string;
  /**
   * The label next to the radio button.
   */
  children?: React.ReactNode;
}

/**
 * A radio button and its label.
 */
const RadioGroupItem = React.forwardRef<HTMLElement, RadioGroupItemProps>(
  ({ className, children, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <div data-slot="radio-group-item-wrapper" className="flex items-center gap-2">
        <RadioPrimitive.Root
          ref={ref}
          // A native button, like the legacy Radix control, so a <label for> names this element only
          nativeButton
          render={<button type="button" />}
          id={id}
          data-slot="radio-group-item"
          className={cn(
            'relative z-0 m-0 size-5 shrink-0 p-0 grow-0 basis-5 cursor-pointer rounded-full border border-solid border-neutral-300 bg-neutral-0 outline-none motion-safe:transition-colors motion-safe:duration-100 motion-safe:ease-out',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
            'data-checked:border-primary-600',
            'data-disabled:cursor-not-allowed data-disabled:bg-neutral-200',
            // A 44px touch target, https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
            "before:absolute before:top-1/2 before:left-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-1/2 before:content-['']",
            className,
          )}
          {...props}
        >
          <RadioPrimitive.Indicator
            data-slot="radio-group-indicator"
            className="relative flex size-full items-center justify-center after:block after:size-2.5 after:rounded-full after:bg-primary-600 after:content-[''] motion-safe:transition motion-safe:duration-200 data-starting-style:scale-80 data-starting-style:opacity-0"
          />
        </RadioPrimitive.Root>
        {children && (
          <label htmlFor={id} className="text-base text-neutral-800 medium:text-sm">
            {children}
          </label>
        )}
      </div>
    );
  },
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps, RadioGroupItemProps };
