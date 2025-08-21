import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useAppSelector, useAppDispatch} from '../../../hooks';
import {logout as handleLogout} from '../store/actions';
import {deleteUserToken} from '../../firebase/store/actions';

export const LogOutButton: React.FunctionComponent = () => {
  const loggingOut = useAppSelector(state => state.oauth.loggingOut);
  const tokenInfo = useAppSelector(state => state.oauth.tokenInfo);
  const {access_token} = tokenInfo;

  const userToken = useAppSelector(state => state.firebase.userToken);
  const dispatch = useAppDispatch();

  if (!access_token || access_token.length <= 0) {
    return null;
  }

  const logout = async () => {
    dispatch(deleteUserToken({id: userToken.id})).then(response => {
      console.log('Deleted user token: ', userToken.token);
    });
    dispatch(handleLogout(true));
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={logout}
      disabled={loggingOut}>
      {loggingOut ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <MaterialDesignIcons name="logout" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
