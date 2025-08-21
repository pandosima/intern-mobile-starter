import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTheme} from '@rneui/themed';
import MainStack from './MainStack';
import OAuthStack from '../modules/oauth/screens';
import { requestUserPermission, getToken } from '../modules/firebase/messaging';

import FirebaseMessageHandler from '../components/FirebaseMessageHandler';

type MaiProps = {
  authenticated?: boolean;
};

export default function Main(props: MaiProps): React.JSX.Element {
  const {theme} = useTheme();

  const isDarkMode = theme.mode === 'dark';

  const backgroundStyle = {
    backgroundColor: theme.colors.primary,
    flex: 1,
  };

  useEffect(() => {
    requestUserPermission().then(() => {
      getToken();
    });
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: backgroundStyle.backgroundColor}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FirebaseMessageHandler />
      {props.authenticated ? <MainStack /> : <OAuthStack />}
    </SafeAreaView>
  );
}
