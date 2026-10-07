import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from './label';

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface FieldContextValue {
  /**
   * The id of the control. The label, the hint and the error derive their ids from it.
   */
  id?: string;
  name?: string;
  /**
   * A string renders in `FieldError`. `true` marks the control as invalid without a message.
   */
  error?: string | boolean;
  hint?: React.ReactNode;
  required?: boolean;
}

const FieldContext = React.createContext<FieldContextValue>({});

/**
 * Reads the closest `Field`. Outside a `Field` every value is `undefined`.
 */
const useField = (): FieldContextValue => React.useContext(FieldContext);

const NO_FIELD: FieldContextValue = {};

/**
 * Hides the closest `Field` from the controls below it. A composite control (e.g. `DateTimePicker`) wires its
 * first control to the `Field` and its other controls by hand, so two controls never share the `Field` id
 */
const FieldReset = ({ children }: { children?: React.ReactNode }) => (
  <FieldContext.Provider value={NO_FIELD}>{children}</FieldContext.Provider>
);

interface FieldControlOptions {
  id?: string;
  name?: string;
  required?: boolean;
  /**
   * Marks the control as invalid when it is not inside a `Field` that has an error.
   */
  hasError?: boolean;
  'aria-describedby'?: string;
}

interface FieldControlProps {
  id?: string;
  name?: string;
  required: boolean;
  invalid: boolean;
  'aria-describedby'?: string;
}

/**
 * Merges the props of a control with its `Field`: the id, the name, the required flag, the invalid flag and
 * `aria-describedby` (the error id when there is an error, else the hint id). Use it to wire a custom control.
 */
const useFieldControl = ({
  id: idProp,
  name: nameProp,
  required: requiredProp,
  hasError,
  'aria-describedby': describedByProp,
}: FieldControlOptions = {}): FieldControlProps => {
  const field = useField();

  const id = field.id ?? idProp;

  let fieldDescription: string | undefined;

  if (field.error) {
    fieldDescription = `${id}-error`;
  } else if (field.hint) {
    fieldDescription = `${id}-hint`;
  }

  const describedBy = [fieldDescription, describedByProp].filter(Boolean).join(' ') || undefined;

  return {
    id,
    name: field.name ?? nameProp,
    required: Boolean(field.required || requiredProp),
    invalid: Boolean(field.error) || Boolean(hasError),
    'aria-describedby': describedBy,
  };
};

/* -------------------------------------------------------------------------------------------------
 * Field
 * -----------------------------------------------------------------------------------------------*/

interface FieldProps extends React.ComponentPropsWithoutRef<'div'>, FieldContextValue {}

/**
 * The root of a form field. It gives an id to the control and shares the name, the error, the hint and the
 * required flag with the parts inside it.
 */
const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, id: idProp, name, error = false, hint, required = false, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    const value = React.useMemo(() => ({ id, name, error, hint, required }), [id, name, error, hint, required]);

    return (
      <FieldContext.Provider value={value}>
        <div ref={ref} data-slot="field" className={cn('flex flex-col items-stretch gap-1', className)} {...props} />
      </FieldContext.Provider>
    );
  },
);

Field.displayName = 'Field';

/* -------------------------------------------------------------------------------------------------
 * FieldLabel
 * -----------------------------------------------------------------------------------------------*/

interface FieldLabelProps extends Omit<React.ComponentPropsWithoutRef<'label'>, 'htmlFor'> {
  /**
   * A node next to the label, e.g. a tooltip trigger.
   */
  action?: React.ReactNode;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, action, className, ...props }, ref) => {
    const { id, required } = useField();

    if (!children) {
      return null;
    }

    return (
      <div data-slot="field-label-wrapper" className="flex items-center">
        <Label
          ref={ref}
          data-slot="field-label"
          className={cn('block truncate', className)}
          {...props}
          id={id ? `${id}-label` : undefined}
          htmlFor={id}
        >
          {children}
          {required && (
            <span aria-hidden className="text-base leading-none text-danger-600 medium:text-sm">
              *
            </span>
          )}
        </Label>
        {action && (
          <span data-slot="field-label-action" className="ml-1 flex leading-0 text-neutral-500">
            {action}
          </span>
        )}
      </div>
    );
  },
);

FieldLabel.displayName = 'FieldLabel';

/* -------------------------------------------------------------------------------------------------
 * FieldHint
 * -----------------------------------------------------------------------------------------------*/

/**
 * Renders the `hint` of the `Field`, unless the field has an error.
 */
const FieldHint = React.forwardRef<HTMLParagraphElement, Omit<React.ComponentPropsWithoutRef<'p'>, 'children'>>(
  ({ className, ...props }, ref) => {
    const { id, hint, error } = useField();

    if (!hint || error) {
      return null;
    }

    return (
      <p
        ref={ref}
        data-slot="field-hint"
        className={cn('text-xs text-neutral-600', className)}
        {...props}
        id={`${id}-hint`}
      >
        {hint}
      </p>
    );
  },
);

FieldHint.displayName = 'FieldHint';

/* -------------------------------------------------------------------------------------------------
 * FieldError
 * -----------------------------------------------------------------------------------------------*/

/**
 * Renders the `error` of the `Field` when it is a string.
 */
const FieldError = React.forwardRef<HTMLParagraphElement, Omit<React.ComponentPropsWithoutRef<'p'>, 'children'>>(
  ({ className, ...props }, ref) => {
    const { id, error } = useField();

    if (!error || typeof error !== 'string') {
      return null;
    }

    return (
      <p
        ref={ref}
        data-slot="field-error"
        data-strapi-field-error=""
        className={cn('text-xs text-danger-600', className)}
        {...props}
        id={`${id}-error`}
      >
        {error}
      </p>
    );
  },
);

FieldError.displayName = 'FieldError';

/* -------------------------------------------------------------------------------------------------
 * FieldAction
 * -----------------------------------------------------------------------------------------------*/

interface FieldActionProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'type'> {
  /**
   * The accessible name of the button. The icon inside is hidden from assistive technology.
   */
  label: string;
  children: React.ReactNode;
}

/**
 * An icon button to put in the `startAction` or the `endAction` of an input.
 */
const FieldAction = React.forwardRef<HTMLButtonElement, FieldActionProps>(
  ({ label, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        data-slot="field-action"
        className={cn(
          'flex cursor-pointer border-none bg-transparent p-0 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement<Record<string, unknown>>(child)
            ? React.cloneElement(child, { 'aria-hidden': true, focusable: 'false' })
            : child,
        )}
        <span className="sr-only">{label}</span>
      </button>
    );
  },
);

FieldAction.displayName = 'FieldAction';

export { Field, FieldLabel, FieldHint, FieldError, FieldAction, FieldReset, useField, useFieldControl };
export type { FieldProps, FieldLabelProps, FieldActionProps, FieldContextValue, FieldControlOptions };
