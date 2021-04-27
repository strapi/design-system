import { createContext } from 'react';

export const RadioContext = createContext({ onValueChange: () => undefined, name: '', size: 'M' });
