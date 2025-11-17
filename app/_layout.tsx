import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
// Class-based error boundary for React Native
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: any) {
    // You can log error to a service here
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Text style={{ color: 'red', fontSize: 18, margin: 20 }}>Error: {this.state.error.message}</Text>
          <Text selectable style={{ color: 'red', fontSize: 12, margin: 20 }}>{this.state.error.stack}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

function AuthGate() {
  // Skip authentication - go directly to main app
  console.log('[AuthGate] Bypassing authentication, going to home page');
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="bio" options={{ headerShown: false }} />
      <Stack.Screen name="gratitude" options={{ headerShown: false }} />
      <Stack.Screen name="promise" options={{ headerShown: false }} />
      <Stack.Screen name="solution" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthGate />
    </ErrorBoundary>
  );
}

// Authentication functions removed - direct access to home page

