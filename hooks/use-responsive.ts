import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

type ScreenSize = {
  width: number;
  height: number;
  isPhone: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  scale: number;
};

export function useResponsive(): ScreenSize {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    const scale = Dimensions.get('window').scale;
    
    return {
      width,
      height,
      isPhone: width < 768,
      isTablet: width >= 768,
      isLandscape: width > height,
      isPortrait: height >= width,
      scale,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const { width, height, scale } = window;
      
      setDimensions({
        width,
        height,
        isPhone: width < 768,
        isTablet: width >= 768,
        isLandscape: width > height,
        isPortrait: height >= width,
        scale,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}

export function getResponsivePadding(isTablet: boolean, isPhone: boolean) {
  if (isTablet) return 40;
  if (isPhone) return 16;
  return 20;
}

export function getResponsiveFontSize(isTablet: boolean, baseSize: number) {
  return isTablet ? baseSize * 1.2 : baseSize;
}

export function getResponsiveImageSize(isTablet: boolean, isPhone: boolean, baseSize: number) {
  if (isTablet) return baseSize * 1.5;
  if (isPhone) return baseSize * 0.8;
  return baseSize;
}