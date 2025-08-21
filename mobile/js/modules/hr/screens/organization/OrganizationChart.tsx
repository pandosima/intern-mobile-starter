import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrganizationChartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo: Use SVG to draw organization chart and allow user to export the chart as image.</Text>
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
