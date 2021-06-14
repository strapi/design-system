import { createContext, useContext } from 'react';

export const RawTableContext = createContext({ rowIndex: 0, colIndex: 0 });
export const useTable = () => useContext(RawTableContext);
