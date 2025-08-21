import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import ShortCuts from '../components/ShortCuts';

const windowsHight = Dimensions.get('window').height 

export default function DashboardScreen():  React.JSX.Element {
  return (
    <View style={styles.container}>
      <ShortCuts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    minHeight: windowsHight
  }
});