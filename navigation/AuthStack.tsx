import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../LoginScreen';

// Simple Auth Stack - just render the LoginScreen directly
// Users can navigate to register/forgot password from within LoginScreen
export default function AuthStack() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});