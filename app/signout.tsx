import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function SignOutScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      console.log('[SignOut] Attempting to sign out...');
      await signOut(auth);
      console.log('[SignOut] Firebase signOut completed');
      
      // Manual navigation as backup
      console.log('[SignOut] Manually navigating to signin...');
      router.replace('/signin');
      
      console.log('[SignOut] Sign out successful');
    } catch (err: any) {
      console.error('[SignOut] Sign out error:', err);
      Alert.alert("Error", "Failed to sign out. Please try again.".replace(/["']/g, ""));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to sign out?</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001f3f",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
