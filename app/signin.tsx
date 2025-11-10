import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import AuthHeader from "../components/AuthHeader";
import FloatingLabelInput from "../components/FloatingLabelInput";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    // Double-tap guard - முக்கியம்!
    if (loading) return;
    
    setError(null);

    // Validation - model படி
    const trimmedEmail = email.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!okEmail) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      console.log("[SignIn] Attempting Firebase signIn with email:", trimmedEmail);
      
      // Direct Firebase call - no AuthContext login function needed
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      console.log("[SignIn] Login successful! User:", userCredential.user.email);
      console.log("[SignIn] User UID:", userCredential.user.uid);
      
      // Clear form on success
      setEmail("");
      setPassword("");
      
      console.log("[SignIn] Navigating to home page...");
      router.replace("/(tabs)/home");
    } catch (e: any) {
      console.error("[SignIn] Login failed:", e);
      
      // Handle specific Firebase error codes
      let errorMessage = "Sign in failed";
      if (e?.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email";
      } else if (e?.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password";
      } else if (e?.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password";
      } else if (e?.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Try again later";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={100}
    >
        <AuthHeader 
          title="Welcome " 
          subtitle="Sign in to continue" 
        />

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            🔐 Enter your email and password to access your account
          </Text>
          
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <FloatingLabelInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? "👁️" : "🙈"}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={[styles.signInButton, loading && styles.buttonDisabled]} 
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signInButtonText}>
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.linkText}>Create account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0766ff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: '100%',
  },
  formContainer: {
    marginTop: 32,
  },
  instructionText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 20,
    lineHeight: 20,
    textAlign: "center",
    opacity: 0.8,
  },
  signInButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  sessionInfo: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0ea5e9",
  },
  sessionInfoText: {
    color: "#0369a1",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});