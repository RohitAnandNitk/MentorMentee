import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userType, setUserType] = useState(localStorage.getItem("userType") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  useEffect(() => {
    // Sync state with localStorage
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userType", userType);
    localStorage.setItem("userName", userName);
  }, [isLoggedIn, userType, userName]);

  const login = (token, userType, userName) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUserType(userType);
    setUserName(userName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUserType("");
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
