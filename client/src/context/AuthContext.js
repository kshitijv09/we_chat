import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  function loginHandler(value) {
    setLoggedIn(value);
  }
  function userHandler(value) {
    console.log("Value is", value);
    setUser(value);
  }
  const value = { loggedIn, user, loginHandler, userHandler };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
