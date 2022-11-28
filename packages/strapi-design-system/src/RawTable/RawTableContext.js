import { createContext, useContext } from 'react';

export const RawTableContext = createContext({
  rowIndex: 0,
  colIndex: 0,
  setTableValues() {
    throw new Error('setTableValues must be initialized via the RawTableContext.Provider');
  },
});
export const useTable = () => useContext(RawTableContext);
