import * as React from 'react';

export const CardContext = React.createContext({ id: '' });

export const useCard = () => React.useContext(CardContext);
