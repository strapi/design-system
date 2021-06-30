import { createContext, useContext } from 'react';

export const GridContext = createContext({ gap: 0, gridCols: 12 });

export const useGrid = () => useContext(GridContext);
