import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

interface NotificationTypes {
  title: string | undefined;
  body: string | undefined;
}

const getNotificationData = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  return {
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
  };
};

const usePushNotifications = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationData, setNotificationData] =
    useState<NotificationTypes | null>(null);

  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your FCM Registration Token (Device Token):', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  const listenToForegroundNotifications = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotificationData(getNotificationData(remoteMessage));

      setModalVisible(true);
    });

    return unsubscribe;
  };

  const listenToBackgroundNotifications = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      setNotificationData(getNotificationData(remoteMessage));

      setModalVisible(true);
    });
  };

  const onNotificationOpenedAppFromBackground = () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        setNotificationData(getNotificationData(remoteMessage));

        setModalVisible(true);
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const remoteMessage = await messaging().getInitialNotification();

    if (remoteMessage) {
      setNotificationData(getNotificationData(remoteMessage));

      setModalVisible(true);
    }
  };

  useEffect(() => {
    let unsubscribeOnMessage: () => void | undefined;
    let unsubscribeOnNotification: () => void | undefined;

    (() => {
      try {
        unsubscribeOnMessage = listenToForegroundNotifications();
        unsubscribeOnNotification = onNotificationOpenedAppFromBackground();
        requestUserPermission();
        getFCMToken();
        listenToBackgroundNotifications();
        onNotificationOpenedAppFromQuit();
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotification();
    };
  }, []);

  return {modalVisible, notificationData, setModalVisible, setNotificationData};
};

export default usePushNotifications;
