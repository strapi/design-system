import { createContext, useContext } from 'react';

export const TableContext = createContext({ rowIndex: 0, colIndex: 0 });
export const useTable = () => useContext(TableContext);
