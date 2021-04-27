import { createContext, useContext } from 'react';

export const FieldContext = createContext({ error: undefined, hint: undefined, name: '', id: '' });
export const useField = () => useContext(FieldContext);
