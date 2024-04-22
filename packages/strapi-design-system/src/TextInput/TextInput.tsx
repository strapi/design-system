import * as React from 'react';

import { FieldInput, FieldProps, FieldInputProps } from '../Field';

export interface TextInputProps extends Pick<FieldProps, 'error'>, FieldInputProps {
  required?: boolean;
  name?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <FieldInput ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';
