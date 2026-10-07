import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

import { useFieldControl } from './field';

/**
 * The bordered box of a text control, shared by `Input` and `InputGroup`. Set `data-invalid` for the error
 * colour and `data-disabled` for the disabled look.
 */
const inputBoxClassName =
  'relative flex w-full min-w-0 items-center rounded-md border border-solid border-neutral-200 bg-neutral-0 outline-none transition duration-200 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600 data-[invalid]:border-danger-600 data-[invalid]:focus-within:border-danger-600 data-[invalid]:focus-within:ring-danger-600 data-[disabled]:bg-neutral-150 data-[disabled]:text-neutral-600';

const inputVariants = cva(
  'block w-full min-w-0 rounded-md border-none bg-inherit px-4 font-normal text-neutral-800 outline-none placeholder:text-neutral-600 placeholder:opacity-100 focus:shadow-none focus:outline-none disabled:cursor-not-allowed aria-disabled:text-inherit text-base leading-6 medium:text-sm medium:leading-5.5',
  {
    variants: {
      size: {
        M: 'py-3 medium:py-2',
        S: 'py-2 medium:py-1',
      },
    },
    defaultVariants: {
      size: 'M',
    },
  },
);

interface InputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  /**
   * A node before the text, e.g. an icon or a `FieldAction`.
   */
  startAction?: React.ReactNode;
  /**
   * A node after the text, e.g. a `FieldAction`.
   */
  endAction?: React.ReactNode;
  /**
   * Marks the input as invalid. Inside a `Field`, the `error` of the field does it.
   */
  hasError?: boolean;
  /**
   * The legacy sizes: `M` is 40px high on desktop, `S` is 32px.
   * @default "M"
   */
  size?: 'S' | 'M';
}

/**
 * A text input. `className` styles the bordered box, the `ref` points at the `<input>`.
 * Inside a `Field` it takes its id, name, required flag, error and hint from the field.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      startAction,
      endAction,
      hasError,
      size = 'M',
      disabled = false,
      onChange,
      id: idProp,
      name: nameProp,
      required: requiredProp,
      'aria-describedby': describedByProp,
      ...props
    },
    ref,
  ) => {
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

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!disabled && onChange) {
        onChange(event);
      }
    };

    return (
      <div
        data-slot="input-wrapper"
        data-invalid={invalid ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={cn(
          inputBoxClassName,
          'justify-between gap-2',
          startAction && 'ps-4',
          endAction && 'pe-4',
          className,
        )}
      >
        {startAction}
        <input
          ref={ref}
          data-slot="input"
          id={id}
          name={name}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          aria-required={required}
          aria-disabled={disabled}
          disabled={disabled}
          data-disabled={disabled ? '' : undefined}
          onChange={handleChange}
          className={cn(inputVariants({ size }), startAction && 'ps-0', endAction && 'pe-0')}
          {...props}
        />
        {endAction && (
          <div data-slot="input-end-action" className="flex items-center">
            {endAction}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants, inputBoxClassName };
export type { InputProps };
