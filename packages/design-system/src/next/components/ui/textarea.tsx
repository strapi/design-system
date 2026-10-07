import * as React from 'react';

import { cn } from '@/lib/utils';

import { useFieldControl } from './field';

interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  /**
   * Marks the textarea as invalid. Inside a `Field`, the `error` of the field does it.
   */
  hasError?: boolean;
  /**
   * Lets the user resize the textarea vertically.
   * @default true
   */
  resizable?: boolean;
}

/**
 * A multi-line text input. Inside a `Field` it takes its id, name, required flag, error and hint from the field.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      hasError,
      resizable = true,
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

    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        id={id}
        name={name}
        aria-invalid={invalid}
        aria-required={required}
        aria-describedby={describedBy}
        className={cn(
          'block min-h-26 w-full rounded-md border border-solid border-neutral-200 bg-neutral-0 p-4 text-base leading-snug text-neutral-800 outline-none transition duration-200 placeholder:text-neutral-600 placeholder:opacity-100 small:text-sm',
          'focus:border-primary-600 focus:ring-2 focus:ring-primary-600 focus:outline-none',
          'aria-invalid:border-danger-600 aria-invalid:focus:border-danger-600 aria-invalid:focus:ring-danger-600',
          'disabled:cursor-not-allowed disabled:bg-neutral-150 disabled:text-neutral-600',
          resizable ? 'resize-y' : 'resize-none',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
