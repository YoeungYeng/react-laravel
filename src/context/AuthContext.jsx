import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAdmin = localStorage.getItem("adminInfo");
  const storedExpiresAt = localStorage.getItem("expiresAt");

  const [admin, setAdmin] = useState(() => {
    if (storedAdmin && storedExpiresAt) {
      const now = new Date().getTime();
      if (now < parseInt(storedExpiresAt)) {
        return JSON.parse(storedAdmin);
      } else {
        localStorage.removeItem("adminInfo");
        localStorage.removeItem("expiresAt");
      }
    }
    return null;
  });

  useEffect(() => {
    if (admin && storedExpiresAt) {
      const now = new Date().getTime();
      const timeLeft = parseInt(storedExpiresAt) - now;

      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          logout();
        }, timeLeft);

        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [admin]);

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("adminInfo", JSON.stringify(adminData));

    const expiresAt = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem("expiresAt", expiresAt);

    const timer = setTimeout(() => {
      logout();
    }, 60 * 60 * 1000);

    // Optional: Clear previous timer if needed
    return () => clearTimeout(timer);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("expiresAt");
  };

  const value = { admin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
