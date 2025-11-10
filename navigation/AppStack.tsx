import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

// Main App Stack - renders the expo-router layout
// This will show your main app with all the tab navigation
export default function AppStack() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});