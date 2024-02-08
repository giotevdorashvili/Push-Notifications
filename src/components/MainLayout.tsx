import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import usePushNotifications from '../hooks/usePushNotification';
import ModalController from '../controllers/ModalController';
import Modal from './modal/Modal';

const MainLayout = () => {
  const notificationData = usePushNotifications();

  useEffect(() => {
    if (notificationData) {
      ModalController.showModal(notificationData);
    }
  }, [notificationData]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>hi notifications</Text>
      <Modal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export default MainLayout;
