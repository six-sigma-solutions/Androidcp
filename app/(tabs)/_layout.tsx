
import React from "react";
import Navbar from "../../components/Navbar";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "../../hooks/use-responsive";

// no runtime import required here

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { isTablet, isPhone } = useResponsive();
  const BASE_HEIGHT = isTablet ? 70 : 58; // Responsive tab bar height
  const bottomInset = Platform.OS === "android" ? insets.bottom : 0;

  return (
    <>
      <Navbar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#0a66c2",
          tabBarInactiveTintColor: "#222",
          
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0.6,
            borderTopColor: "#ccc",
            height: BASE_HEIGHT + bottomInset,
            paddingBottom: (bottomInset > 0 ? bottomInset : 18),
            paddingTop: 0,
            // marginBottom removed to move tab bar up
          },
          tabBarLabelStyle: {
            fontSize: isTablet ? 15 : 13,
            fontWeight: "600",
          },
        }}
      >
                <Tabs.Screen
                  name="home"
                  options={{
                    title: "Home",
                    tabBarIcon: ({ color }: { color?: string }) => (
                        <Ionicons name="home-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                      ),
                  }}
                />
                <Tabs.Screen
                  name="health"
                  options={{
                    title: "Health",
                    tabBarIcon: ({ color }: { color?: string }) => (
                        <Ionicons name="heart-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                      ),
                  }}
                />
                <Tabs.Screen
                  name="wealth"
                  options={{
                    title: "Wealth",
                    tabBarIcon: ({ color }: { color?: string }) => (
                        <Ionicons name="wallet-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                      ),
                  }}
                />
                <Tabs.Screen
                  name="family"
                  options={{
                    title: "Family",
                    tabBarIcon: ({ color }: { color?: string }) => (
                        <Ionicons name="people-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                      ),
                  }}
                />
                <Tabs.Screen
                  name="mylife"
                  options={{
                    title: "My Life",
                    headerShown: false,
                    tabBarIcon: ({ color }: { color?: string }) => (
                      <Ionicons name="leaf-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                    ),
                  }}
                />
                <Tabs.Screen
                  name="about"
                  options={{
                    title: "About",
                    headerShown: false,
                    tabBarIcon: ({ color }: { color?: string }) => (
                      <Ionicons name="information-circle-outline" size={isTablet ? 28 : 23} color={color ?? '#000'} />
                    ),
                  }}
                />
              </Tabs>
            </>
          );
        }