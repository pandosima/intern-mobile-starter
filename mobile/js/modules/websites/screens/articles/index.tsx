import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArticlesManagementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo: Implement screens to manage articles.</Text>
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
