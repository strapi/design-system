import { createContext, useContext } from 'react';

export interface PaginationContextValue {
  activePage: number;
  pageCount: number;
}

export const PaginationContext = createContext<PaginationContextValue>({ activePage: 1, pageCount: 1 });
export const usePagination = (): PaginationContextValue => useContext(PaginationContext);
