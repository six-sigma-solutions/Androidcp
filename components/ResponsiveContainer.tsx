import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '../hooks/use-responsive';

type ResponsiveContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  useSafeArea?: boolean;
  centerContent?: boolean;
};

export default function ResponsiveContainer({
  children,
  style,
  useSafeArea = true,
  centerContent = false,
}: ResponsiveContainerProps) {
  const { isTablet, isPhone, width } = useResponsive();

  const containerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: isTablet ? 40 : isPhone ? 16 : 20,
    ...(centerContent && isTablet && {
      maxWidth: 800,
      alignSelf: 'center',
      width: '100%',
    }),
    ...style,
  };

  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container style={containerStyle}>
      {children}
    </Container>
  );
}