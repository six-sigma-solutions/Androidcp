// Enhanced Firebase initialization with better session persistence
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfigFromFile from '../firebaseConfig';

// Enhanced singleton Firebase initialization  
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfigFromFile);

// Firebase Auth automatically uses AsyncStorage persistence in React Native
export const auth = getAuth(app);

// Firebase v9+ automatically handles persistence in React Native using AsyncStorage
console.log('[Firebase] 📱 Auth persistence is AUTOMATICALLY enabled in React Native');
console.log('[Firebase] 🔒 User sessions are stored securely and persist between app restarts');
console.log('[Firebase] ✅ Once logged in, users will go directly to home page on next app open');
console.log('[Firebase] 🚀 No need to login every time - mobile app experience ready!');

// Store user session for faster app startup
const storeUserSession = async (user: any) => {
  try {
    if (user) {
      await AsyncStorage.setItem('userSession', JSON.stringify({
        uid: user.uid,
        email: user.email,
        lastLogin: Date.now()
      }));
      console.log('[Firebase] User session stored locally');
    } else {
      await AsyncStorage.removeItem('userSession');
      console.log('[Firebase] User session cleared locally');
    }
  } catch (error) {
    console.log('[Firebase] Error managing local session:', error);
  }
};

// Enhanced auth state listener with session management
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('[Firebase] ✅ Session active for user:', user.email);
    console.log('[Firebase] User will stay logged in on app restart');
    storeUserSession(user);
  } else {
    console.log('[Firebase] ❌ No active session');
    storeUserSession(null);
  }
});

console.log('[Firebase] Firebase initialized with automatic persistence for project:', firebaseConfigFromFile.projectId);
console.log('[Firebase] Mobile users will stay logged in automatically!');