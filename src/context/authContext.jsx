// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { USER_ROLES } from "../constant/constants";

const AuthContext = createContext(null);

const defaultUser = {
  id: "USR-ADMIN",
  name: "Admin User",
  email: "admin@test.com",
  role: USER_ROLES.ADMIN,
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const switchUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
