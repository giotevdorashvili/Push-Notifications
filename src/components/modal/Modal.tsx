import React, {
  useRef,
  useState,
  useLayoutEffect,
  useImperativeHandle,
} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

import {ModalContentTypes, ModalRefTypes} from './ModalTypes';
import ModalController from '../../controllers/ModalController';

const ModalComp = () => {
  const [modalData, setModalData] = useState<ModalContentTypes | null>(null);

  const modalRef = useRef<ModalRefTypes | null>(null);

  useLayoutEffect(() => {
    ModalController.setModalRef(modalRef);
  }, []);

  useImperativeHandle(
    modalRef,
    () => ({
      show: (modalContent: ModalContentTypes) => {
        setModalData(modalContent);
      },
      hide: () => {
        setModalData(null);
      },
    }),
    [],
  );

  return (
    <Modal isVisible={!!modalData}>
      <View style={styles.modalContent}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{modalData?.title}</Text>

          <Text style={styles.body}>{modalData?.body}</Text>

          <Pressable onPress={ModalController.hideModal}>
            <Text style={styles.button}>Hide</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComp;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    backgroundColor: '#20232b',
    width: '95%',
    height: 200,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  body: {
    color: 'white',
    fontSize: 22,
  },
  button: {
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
