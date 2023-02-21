import { createContext } from 'react';
import type { ChangeEventHandler } from 'react';

import type { RadioGroupSize } from './RadioGroup';

export interface RadioContextValue {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
  size: RadioGroupSize;
  selected: string;
}

export const RadioContext = createContext<RadioContextValue>({
  onChange: undefined,
  name: '',
  size: 'M',
  selected: '',
});
