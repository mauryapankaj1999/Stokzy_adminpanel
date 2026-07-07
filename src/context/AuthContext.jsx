import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));

  const login = (token, admin) => {
    localStorage.setItem("admin_token", token);

    localStorage.setItem("admin_user", JSON.stringify(admin));

    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");

    localStorage.removeItem("admin_user");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
