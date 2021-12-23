import React, { useEffect, useState } from "react";
import { Auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(Auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <h1>loading plese be patience</h1>
    );
  }
  return (<AuthContext.Provider value={{
    currentUser
  }}>
    {children}
  </AuthContext.Provider>);
};