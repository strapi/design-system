import { createContext, useContext } from 'react';

export const CardContext = createContext({ id: '' });

export const useCard = () => useContext(CardContext);
