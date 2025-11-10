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
import { Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';
import Navbar from '../components/Navbar';
import AuthLoading from '../components/AuthLoading';
import { AuthProvider, useAuth } from '../contexts/AuthContext';


import SignInScreen from './signin';
import SignUpScreen from './signup';
import ForgotPasswordScreen from './forgot-password';
import { Tabs } from 'expo-router';

function AuthGate() {
  const { user, initializing } = useAuth();
  // const router = useRouter();

  console.log('[AuthGate] initializing:', initializing, 'user:', user);
  
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: '#333', fontSize: 18 }}>Loading authentication...</Text>
      </View>
    );
  }

  // Always show the main app structure, regardless of auth status
  // The individual screens will handle auth requirements as needed
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </ErrorBoundary>
  );
}

function NavbarWrapper() {
  const { user, initializing } = useAuth();
  // don't show navbar while auth is initializing
  if (initializing) return null;
  if (!user) return null;
  return <Navbar />;
}

function AuthStartup() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  // Show loading screen while checking authentication
  if (initializing) {
    console.log('Auth initializing - showing splash screen');
    return <AuthLoading />;
  }

  // User is not authenticated - show auth screens (signin/signup/forgot-password)
  if (!user) {
    console.log('User not authenticated, showing auth stack');
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // User is authenticated - show main app with navbar and tabs
  console.log('User authenticated, showing main app with tabs');
  return (
    <>
      <NavbarWrapper />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="bio" options={{ headerShown: false }} />
        <Stack.Screen name="gratitude" options={{ headerShown: false }} />
        <Stack.Screen name="promise" options={{ headerShown: false }} />
        <Stack.Screen name="solution" options={{ headerShown: false }} />
        <Stack.Screen name="about" options={{ headerShown: false }} />
        <Stack.Screen name="signout" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

