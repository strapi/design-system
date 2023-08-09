import { forwardRef, MutableRefObject, useImperativeHandle, useRef } from 'react';

import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldInput,
  FieldInputProps,
  FieldProps,
  FieldLabelProps,
} from '../Field';
import { Flex } from '../Flex';
import { useId } from '../hooks/useId';

export interface TextInputProps
  extends Omit<FieldInputProps, 'id' | 'name'>,
    Pick<FieldProps, 'hint' | 'error' | 'id' | 'name'> {
  label: string;
  labelAction?: FieldLabelProps['action'];
}

export const TextInput = forwardRef<
  { inputWrapperRef: MutableRefObject<HTMLDivElement>; input: MutableRefObject<HTMLInputElement> },
  TextInputProps
>(({ name, hint, error, label, labelAction, id, required, ...props }, ref) => {
  const generatedId = useId(id);
  const inputWrapperRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  if (!label && !props['aria-label']) {
    throw new Error('The TextInput component needs a "label" or an "aria-label" props');
  }

  /**
   * TODO: for V2, remove this.
   */
  useImperativeHandle(
    ref,
    () => ({
      input: inputRef,
      inputWrapperRef,
    }),
    [],
  );

  return (
    <div ref={inputWrapperRef}>
      <Field name={name} hint={hint} error={error} id={generatedId} required={required}>
        <Flex direction="column" alignItems="stretch" gap={1}>
          {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
          <FieldInput ref={inputRef} {...props} />
          <FieldHint />
          <FieldError />
        </Flex>
      </Field>
    </div>
  );
});

TextInput.displayName = 'TextInput';
