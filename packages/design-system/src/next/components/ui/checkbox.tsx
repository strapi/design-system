import * as React from 'react';

import { cn } from '@/lib/utils';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { Check, Minus } from '@strapi/icons';

type CheckedState = boolean | 'indeterminate';

interface CheckboxProps
  extends Omit<CheckboxPrimitive.Root.Props, 'checked' | 'defaultChecked' | 'onCheckedChange' | 'className'> {
  className?: string;
  /**
   * `'indeterminate'` shows a dash, e.g. for a "select all" box when only some rows are selected.
   * The `indeterminate` prop does the same.
   */
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: boolean, eventDetails: CheckboxPrimitive.Root.ChangeEventDetails) => void;
  /**
   * A label next to the box. Without it, give the box an `aria-label`.
   */
  children?: React.ReactNode;
}

/**
 * A checkbox with the legacy look. Pass `children` to render a label next to it.
 */
const Checkbox = React.forwardRef<HTMLElement, CheckboxProps>(
  ({ className, checked, defaultChecked, indeterminate: indeterminateProp, children, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? (children ? generatedId : undefined);

    const indeterminate = Boolean(indeterminateProp) || checked === 'indeterminate';

    const box = (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        // A native button, like the legacy Radix checkbox: a <label for> can name it, so the label names one
        // element (not also the hidden input) and a click on the label toggles it
        nativeButton
        render={<button type="button" />}
        id={id}
        checked={checked === undefined ? undefined : checked === true}
        defaultChecked={defaultChecked === undefined ? undefined : defaultChecked === true}
        indeterminate={indeterminate || (defaultChecked === 'indeterminate' && checked === undefined)}
        className={cn(
          // A fixed 4px radius (legacy and shadcn): the theme radius would round the 20px box into a circle
          'relative z-0 m-0 flex size-5 shrink-0 grow-0 basis-5 cursor-pointer items-center justify-center rounded-md border border-solid border-neutral-300 bg-neutral-0 p-0 text-neutral-0 outline-none',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
          'data-checked:not-data-disabled:border-primary-600 data-checked:not-data-disabled:bg-primary-600',
          'data-indeterminate:not-data-disabled:border-primary-600 data-indeterminate:not-data-disabled:bg-primary-600',
          'data-disabled:cursor-not-allowed data-disabled:bg-neutral-200',
          // A 44px touch target, https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
          "before:absolute before:top-1/2 before:left-1/2 before:-z-10 before:size-full before:min-h-11 before:min-w-11 before:-translate-1/2 before:content-['']",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="pointer-events-none flex size-full items-center justify-center [&>svg]:size-4"
          render={(indicatorProps, state) => (
            <span {...indicatorProps}>{state.indeterminate ? <Minus aria-hidden /> : <Check aria-hidden />}</span>
          )}
        />
      </CheckboxPrimitive.Root>
    );

    if (!children) {
      return box;
    }

    return (
      <div data-slot="checkbox-wrapper" className="flex items-center gap-2">
        {box}
        <label htmlFor={id} className="text-base text-neutral-800 medium:text-sm">
          {children}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps, CheckedState };
