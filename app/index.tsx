import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

// Navigation guard following the model pattern
export default function Index() {
  const router = useRouter();
  const { user, initializing } = useAuth();

  useEffect(() => {
    // Don't navigate while initializing
    if (initializing) {
      console.log('[Index] 🔄 Checking for existing login session...');
      console.log('[Index] Firebase is looking for saved user credentials');
      return;
    }

    console.log('[Index] Auth initialization complete');
    console.log('[Index] User status:', user ? `Logged in: ${user.email}` : 'Not logged in');

    // Immediate navigation for better user experience
    const navigationTimer = setTimeout(() => {
      if (user) {
        console.log('[Index] 🎉 PERSISTENT LOGIN SUCCESS! Going directly to home page');
        console.log('[Index] 📱 Mobile: User stays logged in - no need to login again!');
        console.log('[Index] This is how mobile apps should work - seamless experience');
        router.replace('/(tabs)/home');
      } else {
        console.log('[Index] ❌ No saved session found - redirecting to signin');
        console.log('[Index] 💡 After login, user will stay logged in automatically on mobile');
        console.log('[Index] Next time app opens, user will go straight to home page');
        router.replace('/signin');
      }
    }, 100); // Reduced delay for faster navigation

    return () => clearTimeout(navigationTimer);
  }, [user, initializing, router]);

  // Show splash screen while initializing
  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>Checking login status...</Text>
        <Text style={styles.subText}>
          {user ? 'Welcome back! Taking you to home...' : 'Loading authentication...'}
        </Text>
      </View>
    );
  }

  // This should not render since navigation happens in useEffect
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#28a745",
    textAlign: "center",
  },
});