import React from "react";
import { Auth } from "./Auth";

export const ProtectedRoute = ({children}) => {
  const authentication = Auth();
  if (authentication) {
    return (
      <>
        <h1> You do not have Authentication </h1>
      </>
    )
  }
  return children;
};
