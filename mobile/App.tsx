/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Text } from '@rneui/themed';
import { ThemeProvider } from '@rneui/themed';
import { initRemoteConfig } from './js/modules/firebase/remoteConfig';
import { log } from './js/modules/firebase/crashlytics';


import { theme } from './js/themes';
import {store, persistor} from './js/store';
import MainContainer from './js/containers/MainContainer';

function App(): React.JSX.Element {
  useEffect(() => {
    initRemoteConfig();
    log('App mounted.');
  },[]);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <MainContainer />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}





export default App;
