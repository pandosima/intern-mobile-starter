import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppraisalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo: Implemmen screens to manage appraisals</Text>
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
