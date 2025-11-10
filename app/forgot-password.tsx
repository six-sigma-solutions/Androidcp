import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import AuthHeader from "../components/AuthHeader";
import FloatingLabelInput from "../components/FloatingLabelInput";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    // Double-tap guard
    if (loading) return;
    
    setError(null);
    setMessage(null);

    // Validation
    const trimmedEmail = email.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!okEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, trimmedEmail);
      setMessage("Password reset email sent. Check your inbox.");
      console.log("[ForgotPassword] Reset email sent to:", trimmedEmail);
    } catch (e: any) {
      console.error("[ForgotPassword] Reset failed:", e);
      setError(e?.code ?? "Failed to send reset email");
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
          title="Reset Password" 
          subtitle="Enter your email to receive a reset link" 
        />

        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            📧 Enter your email address and we'll send you a password reset link
          </Text>
          
          <FloatingLabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}
          {message && <Text style={styles.successText}>{message}</Text>}

          <TouchableOpacity 
            style={[styles.resetButton, loading && styles.buttonDisabled]} 
            onPress={handleReset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.resetButtonText}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={styles.linkText}>Back to Sign In</Text>
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
  resetButton: {
    backgroundColor: "#fd7e14",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    alignItems: "center",
    shadowColor: "#fd7e14",
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
  resetButtonText: {
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
  successText: {
    color: "#28a745",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  linksContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
