import { createContext, useContext } from 'react';

export interface RawTableContextValue {
  rowIndex: number;
  colIndex: number;
  setTableValues: ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => void;
}

export const RawTableContext = createContext<RawTableContextValue>({
  rowIndex: 0,
  colIndex: 0,
  setTableValues() {
    throw new Error('setTableValues must be initialized via the RawTableContext.Provider');
  },
});
export const useTable = () => useContext(RawTableContext);
