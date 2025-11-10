import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthLoading() {
  return (
    <LinearGradient
      colors={['#cedb1c', '#79d8d8']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* App Logo */}
        <Image
          source={require('../assets/dailymoney.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* App Name */}
        <Text style={styles.appName}>DM - Daily Message</Text>
        <Text style={styles.tagline}>Health & Wealth</Text>
        
        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color="#d32a2a" 
            style={styles.loader}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 60,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
});