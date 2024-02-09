import React, {createContext, useState, useContext, useCallback} from 'react';

import Modal from '../components/Modal';
import {
  ModalProviderProps,
  ModalContextTypes,
  ModalContentTypes,
} from './ModalContextTypes';

const ModalContext = createContext<ModalContextTypes>({
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modalContent, setModalContent] = useState<ModalContentTypes | null>(
    null,
  );

  const openModal = useCallback((content: ModalContentTypes) => {
    setModalContent(content);
  }, []);

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      {children}

      <Modal {...{...modalContent, closeModal}} />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
