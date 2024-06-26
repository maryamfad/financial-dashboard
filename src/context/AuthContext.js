import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3001/signup", {
        username,
        password,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  const login = async (username, password) => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      alert(res.data);
      console.log("User: ", user);
      setUser({ username: res });
    } catch (err) {
      alert("Login failed!");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
