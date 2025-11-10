import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import MaskedView from '@react-native-masked-view/masked-view';

interface AndroidVideoPlayerProps {
  source: any;
  style?: any;
  maskSource?: any;
  useMask?: boolean;
  onPress?: () => void;
  shouldPlay?: boolean;
  isFocused?: boolean;
  forceUpdate?: number;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

export interface AndroidVideoPlayerRef {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  unload: () => Promise<void>;
}

const AndroidVideoPlayer = forwardRef<AndroidVideoPlayerRef, AndroidVideoPlayerProps>(
  ({
    source,
    style,
    maskSource,
    useMask = false,
    onPress,
    shouldPlay = true,
    isFocused = true,
    forceUpdate = 0,
    onLoad,
    onError
  }, ref) => {
    const videoRef = useRef<Video>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Expose video control methods to parent
    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          await videoRef.current.playAsync();
        }
      },
      pause: async () => {
        if (videoRef.current) {
          await videoRef.current.pauseAsync();
        }
      },
      unload: async () => {
        if (videoRef.current) {
          await videoRef.current.unloadAsync();
        }
      }
    }));

    // Android-optimized video initialization
    const initializeVideo = async () => {
      if (!videoRef.current) return;

      try {
        console.log('AndroidVideoPlayer: Starting initialization...');
        
        // Method 1: Try direct play (fastest)
        try {
          await videoRef.current.playAsync();
          setIsLoaded(true);
          onLoad?.();
          console.log('AndroidVideoPlayer: Direct play successful');
          return;
        } catch (playError) {
          console.log('AndroidVideoPlayer: Direct play failed, trying reload...');
        }

        // Method 2: Reload and play (Android compatibility)
        try {
          await videoRef.current.unloadAsync();
          await videoRef.current.loadAsync(
            source,
            {
              shouldPlay: shouldPlay && isFocused,
              isLooping: true,
              isMuted: true,
              progressUpdateIntervalMillis: 1000,
              positionMillis: 0
            },
            false
          );
          setIsLoaded(true);
          onLoad?.();
          console.log('AndroidVideoPlayer: Reload successful');
          return;
        } catch (loadError) {
          console.log('AndroidVideoPlayer: Reload failed, trying final fallback...');
        }

        // Method 3: Final fallback with delay
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 200 * (retryCount + 1));
        } else {
          console.log('AndroidVideoPlayer: All initialization methods failed');
          onError?.(new Error('Video initialization failed after retries'));
          setIsLoaded(true); // Show UI anyway
        }

      } catch (error) {
        console.log('AndroidVideoPlayer: Initialization error:', error);
        onError?.(error);
        setIsLoaded(true); // Show UI anyway
      }
    };

    // Initialize video when component mounts or key props change
    useEffect(() => {
      const timer = setTimeout(initializeVideo, 50);
      return () => clearTimeout(timer);
    }, [forceUpdate, shouldPlay, isFocused, retryCount]);

    // Auto-restart video if it stops unexpectedly
    const handlePlaybackStatusUpdate = (status: any) => {
      if (status.isLoaded && !status.isPlaying && shouldPlay && isFocused && isLoaded) {
        // Auto-restart if video stops on Android
        videoRef.current?.playAsync().catch(() => {});
      }
    };

    const videoComponent = (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        disabled={!onPress}
        style={[{ flex: 1 }, !onPress && { pointerEvents: 'none' }]}
      >
        <Video
          key={`android-video-${forceUpdate}-${Platform.OS}-${Date.now()}`}
          ref={videoRef}
          source={source}
          style={[styles.video, style]}
          resizeMode={ResizeMode.COVER}
          shouldPlay={shouldPlay && isFocused}
          isLooping={true}
          isMuted={true}
          useNativeControls={false}
          progressUpdateIntervalMillis={1000}
          positionMillis={0}
          onLoad={() => {
            setIsLoaded(true);
            onLoad?.();
            console.log('AndroidVideoPlayer: Video loaded successfully');
          }}
          onError={(error) => {
            console.log('AndroidVideoPlayer: Video error:', error);
            onError?.(error);
            setIsLoaded(true); // Show UI even if video fails
          }}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </TouchableOpacity>
    );

    // Render with or without mask
    if (useMask && maskSource) {
      return (
        <View style={[styles.container, style]} renderToHardwareTextureAndroid>
          <MaskedView
            style={styles.maskedView}
            maskElement={
              <View style={styles.maskContainer}>
                {maskSource}
              </View>
            }
          >
            <View renderToHardwareTextureAndroid>
              {videoComponent}
            </View>
          </MaskedView>
        </View>
      );
    }

    return (
      <View style={[styles.container, style]} renderToHardwareTextureAndroid>
        {videoComponent}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskedView: {
    flex: 1,
  },
  maskContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default AndroidVideoPlayer;