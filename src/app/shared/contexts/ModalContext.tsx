import { ReactNode, createContext, useState } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  changeModalState: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext({} as ModalContextProps);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeModalState = () => setIsModalOpen((isModalOpen) => !isModalOpen);

  return (
    <ModalContext.Provider value={{ isModalOpen, changeModalState }}>
      {children}
    </ModalContext.Provider>
  );
};
