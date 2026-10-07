import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

import { useFieldControl } from './field';

/* -------------------------------------------------------------------------------------------------
 * toggleVariants
 * -----------------------------------------------------------------------------------------------*/

/**
 * The look of a pressable button, used by `ToggleGroupItem`. The legacy system has no such component, so the
 * look follows the options of `Toggle`: a white tile with a border when pressed.
 */
const toggleVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-transparent text-xs leading-snug font-semibold whitespace-nowrap text-neutral-600 outline-none transition-colors hover:bg-neutral-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:text-neutral-500 aria-pressed:border-neutral-200 aria-pressed:bg-neutral-0 aria-pressed:text-primary-600 data-pressed:border-neutral-200 data-pressed:bg-neutral-0 data-pressed:text-primary-600 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-neutral-200 bg-neutral-0 hover:bg-neutral-100',
      },
      size: {
        default: 'h-8 min-w-8 px-3',
        sm: 'h-6 min-w-6 px-2',
        lg: 'h-10 min-w-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/

interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'children' | 'size' | 'checked' | 'defaultChecked' | 'type'> {
  /**
   * The text of the option for `true`.
   */
  onLabel: string;
  /**
   * The text of the option for `false`.
   */
  offLabel: string;
  /**
   * `null` selects neither option, e.g. for a boolean without a value.
   */
  checked?: boolean | null;
  defaultChecked?: boolean | null;
  /**
   * Marks the toggle as invalid. Inside a `Field`, the `error` of the field does it.
   */
  hasError?: boolean;
}

/**
 * A boolean input that shows two options, `offLabel` and `onLabel`. It is a checkbox under the hood, so give it a
 * label with a `Field` or an `aria-label`. `className` styles the outer box, the `ref` points at the `<input>`.
 */
const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      className,
      onLabel,
      offLabel,
      disabled,
      hasError,
      required: requiredProp,
      id: idProp,
      name: nameProp,
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      'aria-describedby': describedByProp,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean | null>(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : uncontrolledChecked;

    const {
      id,
      name,
      required,
      invalid,
      'aria-describedby': describedBy,
    } = useFieldControl({
      id: idProp,
      name: nameProp,
      required: requiredProp,
      hasError,
      'aria-describedby': describedByProp,
    });

    const isOff = checked === false;
    const isOn = checked === true;

    const optionClassName =
      'flex flex-1 basis-1/2 justify-center rounded-md border border-solid px-3 py-1.5 text-xs font-semibold uppercase';

    return (
      <div
        data-slot="toggle"
        data-invalid={invalid ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          'relative flex flex-wrap rounded-md border border-solid p-1 outline-none transition duration-200',
          disabled ? 'cursor-not-allowed bg-neutral-150' : 'cursor-pointer bg-neutral-100',
          invalid
            ? 'border-danger-600 focus-within:border-danger-600 focus-within:ring-2 focus-within:ring-danger-600'
            : 'border-neutral-200 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600',
          className,
        )}
      >
        <span
          data-slot="toggle-off"
          data-selected={isOff ? '' : undefined}
          className={cn(
            optionClassName,
            isOff && disabled && 'border-neutral-300 bg-neutral-200',
            isOff && !disabled && 'border-neutral-200 bg-neutral-0',
            !isOff && 'bg-transparent',
            !isOff && (disabled ? 'border-neutral-150' : 'border-neutral-100'),
            disabled ? 'text-neutral-700' : isOff ? 'text-danger-700' : 'text-neutral-600',
          )}
        >
          {offLabel}
        </span>
        <span
          data-slot="toggle-on"
          data-selected={isOn ? '' : undefined}
          className={cn(
            optionClassName,
            isOn && disabled && 'border-neutral-300 bg-neutral-200',
            isOn && !disabled && 'border-neutral-200 bg-neutral-0',
            !isOn && 'bg-transparent',
            !isOn && (disabled ? 'border-neutral-150' : 'border-neutral-100'),
            disabled ? 'text-neutral-700' : isOn ? 'text-primary-600' : 'text-neutral-600',
          )}
        >
          {onLabel}
        </span>
        <input
          ref={ref}
          type="checkbox"
          data-slot="toggle-input"
          id={id}
          name={name}
          checked={isOn}
          disabled={disabled}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(event) => {
            if (!isControlled) {
              setUncontrolledChecked(event.currentTarget.checked);
            }

            onChange?.(event);
          }}
          className="absolute top-0 left-0 z-0 m-0 size-full cursor-[inherit] opacity-0"
          {...props}
        />
      </div>
    );
  },
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
export type { ToggleProps };
