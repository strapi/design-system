import * as React from 'react';

import { Field } from '../Field';

interface TextInputProps extends Field.InputProps {}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <Field.Input ref={ref} {...props} />;
});

TextInput.displayName = 'TextInput';

export { TextInput };
export type { TextInputProps };
