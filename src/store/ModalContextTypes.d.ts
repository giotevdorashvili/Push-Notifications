import {ReactNode} from 'react';

export type ModalProviderProps = {
  children: ReactNode;
};

export interface ModalContentTypes {
  title: string | undefined;
  body: string | undefined;
}

export type ModalContextTypes = {
  openModal: (content: ModalContentTypes) => void;
  closeModal: () => void;
};
