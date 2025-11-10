import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
import AuthHeader from "../components/AuthHeader";
import FloatingLabelInput from "../components/FloatingLabelInput";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    // Double-tap guard - முக்கியம்!
    if (loading) return;
    
    setError(null);

    // Validation - model படி
    const trimmedEmail = email.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!okEmail) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // Direct Firebase call
      const { user } = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      await updateProfile(user, { displayName: name.trim() });
      
      console.log("[SignUp] Account created successfully!");
      
      // Clear form fields on success
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
      // Navigate to home page
      router.replace("/(tabs)/home");
    } catch (e: any) {
      console.error("[SignUp] Signup failed:", e);
      setError(e?.code ?? "Sign up failed");
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
          title="Create Account" 
          subtitle="Join us today" 
        />

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            ✨ Create your account to start your journey with us
          </Text>
          
          <FloatingLabelInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
          />

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

          <FloatingLabelInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightIcon={showConfirmPassword ? "👁️" : "🙈"}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity 
            style={[styles.signUpButton, loading && styles.buttonDisabled]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signUpButtonText}>
                {loading ? "Creating..." : "Sign Up"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <Text style={styles.linkLabel}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={styles.linkText}> Sign In</Text>
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
  signUpButton: {
    backgroundColor: "#28a745",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#28a745",
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
  signUpButtonText: {
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
    justifyContent: "center",
    marginTop: 24,
  },
  linkLabel: {
    color: "#6c757d",
    fontSize: 14,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
});