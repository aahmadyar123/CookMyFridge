import React from 'react'
import { createContext, useContext, useState } from "react";
import { Auth } from "../Utils/Auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    console.log("in login: ", user);
    const response = await axios.post("http://localhost:8000/register", user);
    const token = response.data['token']
    setToken(token);

    //backend sends back token
    console.log('Submit TOKEN: ', token);
    
    //store in cookies
    document.cookie = `token=${token}`;
    console.log("SET COOKIE ", document.cookie);
    navigate('/');
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{value}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);