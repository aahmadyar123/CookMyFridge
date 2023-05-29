import React from "react";
import { Auth } from "./Auth";

export const ProtectedRoute = async ({children}) => {
  const authentication = Auth();
  console.log(authentication.data['ingredients']);
  console.log("In protected: ", authentication.status);
  if (authentication.status !== 200) {
    return (
      <>
        <h1> You do not have Authentication </h1>
      </>
    )
  }
  
  return children;
};
