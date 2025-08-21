import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { theme } from '../themes';

const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Dashboard' },
          ],
        })
      )}
    >
      <MaterialDesignIcons name='home' size={36} color={theme.lightColors?.white}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});

export default HomeButton;