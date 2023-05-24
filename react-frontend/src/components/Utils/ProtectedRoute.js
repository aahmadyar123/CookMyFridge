import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({children }) => {
  const { value } = useAuth();
  if (!value.token) {
    return (
      <>
        <h1> You do not have Authentication </h1>
      </>
    )
  }
  return children;
};
