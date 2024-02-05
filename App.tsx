import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from './src/components/Modal';

const App = () => {
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

export default App;
