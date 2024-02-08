export interface ModalContentTypes {
  title: string | undefined;
  body: string | undefined;
}

export type ModalRefTypes = {
  show: (modalContent: ModalContentTypes) => void;
  hide: () => void;
};
