import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  /* function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
 */
  function loginHandler(value) {
    setLoggedIn(value);
  }
  function userHandler(value) {
    console.log("Value is", value);
    setUser(value);
  }

  /* useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []); */

  const value = { loggedIn, user, loginHandler, userHandler };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
