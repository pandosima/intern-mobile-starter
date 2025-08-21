import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimeRecordScreenProps } from '../types';

export default function TimeRecords(props: TimeRecordScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo: Implement screens to manage time records.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});
