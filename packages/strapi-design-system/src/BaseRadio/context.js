import { createContext } from 'react';

export const RadioContext = createContext({ onChange: () => undefined, name: '', size: 'M' });
