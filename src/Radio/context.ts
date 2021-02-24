import { createContext } from 'react';
import { RadioSize } from './types';

export interface RadioContextTypes {
  onSelect: (nextValue: string) => void;
  selected?: string;
  name: string;
  size: RadioSize;
}

export const RadioContext = createContext<RadioContextTypes>({ onSelect: () => undefined, name: '', size: 'S' });
