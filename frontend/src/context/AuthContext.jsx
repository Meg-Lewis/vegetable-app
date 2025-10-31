// Provides authentication state for the app.
// This allows secure communication with the backend by including the token in API requests.
// The app is wrapped in AuthProvider in main.jsx to provide this Auth context to all components.

// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load cached user immediately to prevent flicker
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🔥 onAuthStateChanged fired:", firebaseUser ? "User logged in" : "No user");
      if (firebaseUser) {
        // Get a fresh ID token
        const idToken = await firebaseUser.getIdToken();
        setUser(firebaseUser);
        setToken(idToken);
        localStorage.setItem("user", JSON.stringify(firebaseUser));
        localStorage.setItem("token", idToken);
      } else {
        // Clear everything on logout
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {loading ? <div>Checking authentication...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
