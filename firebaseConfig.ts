
// Firebase configuration for React Native
const firebaseConfig = {
  apiKey: "AIzaSyCBnLyYkUJr3Qg_IRZCqLRtEKdarlPv_CM",
  authDomain: "react-native-dm.firebaseapp.com",
  projectId: "react-native-dm",
  storageBucket: "react-native-dm.firebasestorage.app",
  messagingSenderId: "718070565957",
  appId: "1:718070565957:ios:67a1801424f5970d65672c",
  // Android app ID for reference
  // appId: "1:718070565957:android:4ca8ab1c774de08f65672c",
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Please check your firebaseConfig.ts file.');
}

export default firebaseConfig;

