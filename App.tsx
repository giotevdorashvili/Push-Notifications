import React from 'react';
import {View, Text} from 'react-native';
import usePushNotifications from './src/hooks/usePushNotification';

const App = () => {
  usePushNotifications();

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default App;
