import { createContext, useContext } from 'react';

export const FolderCardContext = createContext();

export const useFolderCard = () => useContext(FolderCardContext);
