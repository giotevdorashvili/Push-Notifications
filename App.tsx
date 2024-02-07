import React from 'react';

import {ModalProvider} from './src/store/ModalContext';
import MainLayout from './src/components/MainLayout';

const App = () => {
  return (
    <ModalProvider>
      <MainLayout />
    </ModalProvider>
  );
};

export default App;
