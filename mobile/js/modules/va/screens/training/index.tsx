import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BotsTrainingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo: Implement the screen to train the bots.</Text>
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
