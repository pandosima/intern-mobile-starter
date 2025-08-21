import {
  getRemoteConfig,
  setConfigSettings,
  setDefaults,
  fetchAndActivate,
  getValue,
  FirebaseRemoteConfigTypes
} from '@react-native-firebase/remote-config';
import DefaultConfig from '../../config/DefaultConfig';
import { app } from './app';

export const remoteConfig = getRemoteConfig(app);
const fetchRemoveConfig = async (callback?: Function) => {
  try {
    await setConfigSettings(remoteConfig, {
      minimumFetchIntervalMillis: DefaultConfig.REMOTE_CONFIG_FETCH_INTERVAL,
    });
  } catch (error) {
    console.error('remote config settings error:', error);
  }

  try {
    await fetchAndActivate(remoteConfig);
    if (callback) {
      callback();
    }
  } catch (error) {
    console.error('remote config fetch error:', error);
  }
};

export const initRemoteConfig = async (callback?: Function) => {
  setDefaults(remoteConfig, DefaultConfig.RemoteConfigDefaultValues)
    .then(() => {
      fetchRemoveConfig(callback);
    })
    .catch((error) => {
      console.error('setDefaults error:', error);
    });
}

export const getConfigValue = (key: string): FirebaseRemoteConfigTypes.ConfigValue => {
  return getValue(remoteConfig, key);
}