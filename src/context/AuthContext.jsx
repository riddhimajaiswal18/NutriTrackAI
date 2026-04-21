import { createContext, useContext, useState, useEffect } from "react";
import { onAuthChange } from "../services/authService";
import {
  signUp as authSignUp,
  signIn as authSignIn,
  logout as authLogout,
} from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async (email, password, displayName) => {
    return await authSignUp(email, password, displayName);
  };

  const login = async (email, password) => {
    return await authSignIn(email, password);
  };

  const logout = async () => {
    await authLogout();
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
