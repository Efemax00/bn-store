import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";
import {
  login as loginService,
  logout as logoutService,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();

        localStorage.setItem("adminToken", token);

        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("adminToken");

        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email, password) {
    try {
      const firebaseUser = await loginService(email, password);

      setUser(firebaseUser);
      setIsAuthenticated(true);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async function logout() {
    await logoutService();

    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}