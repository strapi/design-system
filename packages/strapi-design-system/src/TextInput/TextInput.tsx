import * as React from 'react';

import { FieldInput, FieldProps } from '../Field';

export interface TextInputProps extends Pick<FieldProps, 'error'> {
  'aria-label': string;
  'aria-describedby'?: string;
  required?: boolean;
  name?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <FieldInput ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';
