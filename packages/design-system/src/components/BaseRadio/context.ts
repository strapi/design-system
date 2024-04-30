import * as React from 'react';

import type { RadioGroupSize } from './RadioGroup';

export interface RadioContextValue {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  size: RadioGroupSize;
  selected: string;
}

export const RadioContext = React.createContext<RadioContextValue>({
  onChange: undefined,
  name: '',
  size: 'M',
  selected: '',
});
