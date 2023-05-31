import React from 'react'
import { createContext, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (user) => {
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

  const handleLogin = async (user) => {
    console.log("In Login");
    const response = await axios.post("http://localhost:8000/login", user);
    console.log(response.status)

    if (response.status === 200){
        const token = response.data['token'];
        setToken(token);
    
        //backend sends back token
        console.log('Submit TOKEN: ', token);
        
        //store in cookies
        document.cookie = `token=${token}`;
        console.log("SET COOKIE ", document.cookie);
        navigate('/');
        return true;
    }
    
    else{
      return false;
    }
  }

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister
  };

  return (
    <AuthContext.Provider value={{value}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);