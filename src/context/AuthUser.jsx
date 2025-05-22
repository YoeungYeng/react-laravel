import { createContext, useState } from "react";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  // Get user info from localStorage and parse it (if exists)
  const storedUser = localStorage.getItem("userInfo");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData)); // Store as string
  };

// Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  // Context value
  const value = { user, login, logout };

  return (
    <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
  );
};