import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal as NativeModal,
} from 'react-native';

import usePushNotifications from '../hooks/usePushNotification';

const Modal = () => {
  const {modalVisible, notificationData, setModalVisible, setNotificationData} =
    usePushNotifications();

  const handleCloseModal = () => {
    setModalVisible(false);
    setNotificationData(null);
  };

  return (
    <NativeModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      <View style={styles.modalContent}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{notificationData?.title}</Text>
          <Text style={styles.body}>{notificationData?.body}</Text>
          <Pressable onPress={handleCloseModal}>
            <Text style={styles.close}>Close</Text>
          </Pressable>
        </View>
      </View>
    </NativeModal>
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
    gap: 20,
    backgroundColor: '#20232b',
    width: '90%',
    minHeight: 200,
    borderRadius: 20,
    padding: 10,
  },
  title: {
    color: 'white',
  },
  body: {
    color: 'white',
    fontSize: 25,
  },
  close: {
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default Modal;
