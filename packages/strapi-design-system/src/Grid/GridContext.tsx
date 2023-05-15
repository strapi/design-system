import { createContext, useContext } from 'react';

import type { ResponsiveValue } from '../helpers/handleResponsiveValues';

export interface GridContextValue {
  gap: ResponsiveValue;
  gridCols: number;
}

export const GridContext = createContext<GridContextValue>({ gap: 0, gridCols: 12 });

export const useGrid = () => useContext(GridContext);
