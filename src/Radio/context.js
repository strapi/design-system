import { createContext } from 'react';

export const RadioContext = createContext({ onSelect: () => undefined, name: '', size: 'S' });
