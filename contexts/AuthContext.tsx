import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthContextType = { 
  user: User | null; 
  initializing: boolean; 
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  initializing: true 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    console.log('[AuthContext] 🚀 Setting up persistent auth state listener...');
    console.log('[AuthContext] Firebase will automatically restore login sessions');
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('[AuthContext] Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      
      // Always update user state
      setUser(user);
      
      if (initializing) {
        setInitializing(false);
        console.log('[AuthContext] Auth initialization complete');
        if (user) {
          console.log('[AuthContext] ✅ PERSISTENT SESSION FOUND - user stays logged in!');
          console.log('[AuthContext] 📱 Mobile: No need to login again on app restart');
          console.log('[AuthContext] Session details - UID:', user.uid, 'Email:', user.email);
        } else {
          console.log('[AuthContext] ❌ No existing session - user needs to login');
          console.log('[AuthContext] 💡 After login, session will persist automatically');
        }
      } else {
        // Handle runtime auth state changes
        if (user) {
          console.log('[AuthContext] ✅ User session active - automatic login working!');
        } else {
          console.log('[AuthContext] ❌ User session ended - redirecting to login');
        }
      }
    });
    return unsubscribe;
  }, [initializing]);

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};