import * as React from 'react';

import { FieldInput, FieldProps, FieldInputProps } from '../Field';

interface TextInputProps extends Pick<FieldProps, 'error'>, FieldInputProps {
  required?: boolean;
  name?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <FieldInput ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';

export { TextInput };
export type { TextInputProps };
