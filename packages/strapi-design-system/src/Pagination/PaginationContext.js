import { createContext, useContext } from 'react';

export const PaginationContext = createContext(1);
export const useActivePage = () => useContext(PaginationContext);
