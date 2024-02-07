import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import usePushNotifications from '../hooks/usePushNotification';
import {useModal} from '../store/ModalContext';

const MainLayout = () => {
  const notificationData = usePushNotifications();

  const {openModal} = useModal();

  useEffect(() => {
    if (notificationData) {
      openModal(notificationData);
    }
  }, [notificationData, openModal]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>hi notifications</Text>
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
