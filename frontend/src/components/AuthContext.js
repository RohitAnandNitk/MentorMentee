import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import { startTransition } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, userType: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          userId: decodedToken.userId,
          userType: decodedToken.role,
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setTimeout(() => logout(), 0); // Defer logout to avoid concurrent update issues
      }
    }
  }, []);

  const login = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      setUser({
        userId: decodedToken.userId,
        userType: decodedToken.role,
      });
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true"); // Ensure sync
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    startTransition(() => {
      setUser(null);
      setIsLoggedIn(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
