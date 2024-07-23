import * as React from 'react';

export interface RawTableContextValue {
  rowIndex: number;
  colIndex: number;
  setTableValues: ({ rowIndex, colIndex }: { rowIndex: number; colIndex: number }) => void;
}

export const RawTableContext = React.createContext<RawTableContextValue>({
  rowIndex: 0,
  colIndex: 0,
  setTableValues() {
    throw new Error('setTableValues must be initialized via the RawTableContext.Provider');
  },
});
export const useTable = () => React.useContext(RawTableContext);
