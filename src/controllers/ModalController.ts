import {MutableRefObject} from 'react';
import {ModalContentTypes, ModalRefTypes} from '../components/modal/ModalTypes';

class ModalController {
  static modalRef: MutableRefObject<ModalRefTypes | null>;

  static setModalRef = (ref: MutableRefObject<ModalRefTypes | null>) => {
    this.modalRef = ref;
  };

  static showModal = (modalContent: ModalContentTypes) => {
    this.modalRef.current?.show(modalContent);
  };

  static hideModal = () => {
    this.modalRef.current?.hide();
  };
}

export default ModalController;
