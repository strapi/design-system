import * as React from 'react';

export const ModalContext = React.createContext(() => {});
export const useModal = () => React.useContext(ModalContext);
