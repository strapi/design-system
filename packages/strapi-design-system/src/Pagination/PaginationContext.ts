import * as React from 'react';

export interface PaginationContextValue {
  activePage: number;
  pageCount: number;
}

export const PaginationContext = React.createContext<PaginationContextValue>({ activePage: 1, pageCount: 1 });
export const usePagination = () => React.useContext(PaginationContext);
