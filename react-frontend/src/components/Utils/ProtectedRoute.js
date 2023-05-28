import React from "react";
import { Auth } from "./Auth";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({children}) => {
  if (Auth()) {
    return (
      <>
        <h1> You do not have Authentication </h1>
      </>
    )
  }
  return children;
};
