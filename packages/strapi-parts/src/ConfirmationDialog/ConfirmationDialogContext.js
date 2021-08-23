import { createContext, useContext } from 'react';

export const ConfirmationDialogContext = createContext();
export const useModal = () => useContext(ModalContext);
