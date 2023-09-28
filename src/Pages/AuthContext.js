// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(() =>
    localStorage.getItem("token")
  );

  const login = () => {
    // Implement your login logic here
    setAuthentication(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setAuthentication(false);
  };

  return (
    <AuthContext.Provider value={{ authentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
