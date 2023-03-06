import { createContext, ReactNode, useContext } from 'react';

export interface FieldContextValue {
  error?: string | boolean;
  hint?: ReactNode;
  name?: string;
  id: string;
  required: boolean;
}

export const FieldContext = createContext<FieldContextValue>({ id: '', required: false });
export const useField = () => useContext(FieldContext);
