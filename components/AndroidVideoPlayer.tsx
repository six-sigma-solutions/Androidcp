import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import MaskedView from "@react-native-masked-view/masked-view";
import { Asset } from "expo-asset";

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
  (
    {
      source,
      style,
      maskSource,
      useMask = false,
      onPress,
      shouldPlay = true,
      isFocused = true,
      forceUpdate = 0,
      onLoad,
      onError,
    },
    ref
  ) => {
    const videoRef = useRef<Video>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 🔹 Expose control methods
    useImperativeHandle(ref, () => ({
      play: async () => {
        try {
          await videoRef.current?.playAsync();
        } catch (e) {
          console.log("AndroidVideoPlayer play error:", e);
        }
      },
      pause: async () => {
        try {
          await videoRef.current?.pauseAsync();
        } catch (e) {
          console.log("AndroidVideoPlayer pause error:", e);
        }
      },
      unload: async () => {
        try {
          await videoRef.current?.unloadAsync();
        } catch (e) {
          console.log("AndroidVideoPlayer unload error:", e);
        }
      },
    }));

    // 🔹 Preload video asset once (prevents black screen)
    useEffect(() => {
      let mounted = true;
      const preload = async () => {
        try {
          if (typeof source === "number") {
            await Asset.fromModule(source).downloadAsync();
          }
          if (mounted) setIsLoaded(true);
        } catch (err) {
          console.log("AndroidVideoPlayer preload error:", err);
        }
      };
      preload();
      return () => {
        mounted = false;
      };
    }, [source]);

    // 🔹 Auto play / pause based on focus & state
    useEffect(() => {
      const video = videoRef.current;
      if (!video || !isLoaded) return;

      const timer = setTimeout(() => {
        if (isFocused && shouldPlay) {
          video.playAsync().catch(() => {});
        } else {
          video.pauseAsync().catch(() => {});
        }
      }, 200); // small delay for stability

      return () => clearTimeout(timer);
    }, [isFocused, shouldPlay, isLoaded]);

    const handlePlaybackStatusUpdate = (status: any) => {
      if (status.isLoaded && !status.isPlaying && shouldPlay && isFocused) {
        videoRef.current?.playAsync().catch(() => {});
      }
    };

    const videoElement = (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        disabled={!onPress}
        style={styles.touchArea}
      >
        <Video
          key={`video-${forceUpdate}`}
          ref={videoRef}
          source={source}
          resizeMode={ResizeMode.COVER}
          style={[styles.video, style]}
          shouldPlay={shouldPlay && isFocused}
          isLooping
          isMuted
          useNativeControls={false}
          onLoad={() => {
            onLoad?.();
            console.log("✅ AndroidVideoPlayer: video ready");
          }}
          onError={(err) => {
            console.log("❌ AndroidVideoPlayer error:", err);
            onError?.(err);
          }}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      </TouchableOpacity>
    );

    // 🔹 Render with or without mask
    if (useMask && maskSource) {
      return (
        <View style={[styles.container, style]} renderToHardwareTextureAndroid>
          <MaskedView
            style={styles.maskedView}
            maskElement={<View style={styles.maskImageContainer}>{maskSource}</View>}
          >
            <View renderToHardwareTextureAndroid>{videoElement}</View>
          </MaskedView>
        </View>
      );
    }

    return (
      <View style={[styles.container, style]} renderToHardwareTextureAndroid>
        {videoElement}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  touchArea: {
    flex: 1,
  },
  maskedView: {
    flex: 1,
  },
  maskImageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

AndroidVideoPlayer.displayName = "AndroidVideoPlayer";
export default AndroidVideoPlayer;
