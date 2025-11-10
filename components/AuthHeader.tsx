import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useResponsive } from '../hooks/use-responsive';

type Props = {
  title?: string;
  subtitle?: string;
};

export default function AuthHeader({ title = '', subtitle = 'Manage your healthy, wealthy life!  '}: Props) {
  const { isTablet, isPhone } = useResponsive();
  
  return (
    <View style={[styles.container, { marginTop: isTablet ? -10 : -20 }]} accessible accessibilityRole="header">
      {/* prefer local asset if available */}
      { }
      <Image
        source={
          (() => {
            try {
              return require('../assets/dailymoney.png');
            } catch (e) {
              return { uri: 'https://res.cloudinary.com/dq9zq6ubg/image/upload/v1758609670/daily-money_fbjvzk.png' };
            }
          })()
        }
        style={[styles.logo, { 
          width: isTablet ? 140 : 100, 
          height: isTablet ? 140 : 100 
        }]}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
        accessibilityLabel="DM logo"
      />
      <Text style={[styles.title, { 
        fontSize: isTablet ? 36 : 30,
        marginTop: isTablet ? 10 : 5 
      }]} accessibilityRole="text">
        {title}
      </Text>
      {subtitle ? <Text style={[styles.subtitle, { 
        fontSize: isTablet ? 20 : 16,
        paddingHorizontal: isTablet ? 40 : 20 
      }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,
  },
  subtitle: {
    marginTop: -5,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
