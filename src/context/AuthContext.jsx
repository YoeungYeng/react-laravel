import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Get admin info from localStorage and parse it (if exists)
  const storedAdmin = localStorage.getItem("adminInfo");
  const [admin, setAdmin] = useState(storedAdmin ? JSON.parse(storedAdmin) : null);

  // Login function
  const login = (admin) => {
    setAdmin(admin);
    localStorage.setItem("adminInfo", JSON.stringify(admin)); // Store as string
  };

  // Logout function
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminInfo");
  };

  // Context value
  const value = { admin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
