import * as React from 'react';

export interface FieldContextValue {
  error?: string | boolean;
  hint?: React.ReactNode;
  name?: string;
  id: string;
  required: boolean;
}

export const FieldContext = React.createContext<FieldContextValue>({ id: '', required: false });
export const useField = () => React.useContext(FieldContext);
