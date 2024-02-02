import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const usePushNotifications = () => {
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
      console.log(
        'A new message arrived! (FOREGROUND)',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  };

  const listenToBackgroundNotifications = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(
        'A new message arrived! (BACKGROUND)',
        JSON.stringify(remoteMessage),
      );
    });
  };

  const onNotificationOpenedAppFromBackground = () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log(
          'App opened from BACKGROUND by tapping notification:',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const remoteMessage = await messaging().getInitialNotification();

    if (remoteMessage) {
      console.log(
        'App opened from QUIT by tapping notification:',
        JSON.stringify(remoteMessage),
      );
    }
  };

  useEffect(() => {
    let unsubscribeOnMessage: () => void;
    let unsubscribeOnNotification: () => void;

    (async () => {
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
};

export default usePushNotifications;
