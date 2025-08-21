import {combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import oauthReducer from '../modules/oauth/store';
import firebaseReducer from '../modules/firebase/store';

const rootReducer = combineReducers({
  oauth: oauthReducer,
  firebase: firebaseReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof persistedReducer>;
