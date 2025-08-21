import { 
    getMessaging,
    requestPermission,
    getToken as messagingGetToken,
    onMessage as messagingOnMessage,
    AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import { app } from './app';

export const messaging = getMessaging(app);

export const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
        // iOS specific code
        const authStatus = await requestPermission(messaging);
        const enabled =
            authStatus === AuthorizationStatus.AUTHORIZED ||
            authStatus === AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    } else if (Platform.OS === 'android') {
      // Check if the Android version is API 33 (Android 13)
      const androidVersion = Platform.Version;
      if (androidVersion >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Notification permission denied.');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        console.log('Running on an Android version lower than 13');
        // Handle permissions for versions lower than Android 13 if needed
      }
    }
};

export const getToken = async () => {
    messagingGetToken(messaging)
    .then(async token => {
        console.log('FCM token: ' + token);
        //Todo: Send the token to backend
    });
};

export const onMessage = (listener: (message: FirebaseMessagingTypes.RemoteMessage) => any) => {
    messagingOnMessage(messaging, listener);
};