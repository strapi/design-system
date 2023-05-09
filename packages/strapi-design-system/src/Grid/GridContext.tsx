import { createContext, useContext } from 'react';

export interface GridContextValue {
  gap: number | number[];
  gridCols: number;
}

export const GridContext = createContext<GridContextValue>({ gap: 0, gridCols: 12 });

export const useGrid = () => useContext(GridContext);
