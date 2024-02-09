import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

interface ModalProps {
  title?: string | undefined;
  body?: string | undefined;
  closeModal: () => void;
}

const ModalComp = ({title, body, closeModal}: ModalProps) => {
  return (
    <Modal isVisible={!!title || !!body}>
      <View style={styles.modalContent}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>

          <Pressable onPress={closeModal}>
            <Text style={styles.button}>Hide</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

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

export default ModalComp;
