import React from "react";
// import {useState} from 'react'
// import { Auth } from "./Auth";

export const ProtectedRoute = ({children}) => {

  // console.log("In protect before auth");
  // const authentication = await Auth();
  // console.log("In protected: ", authentication.status);
  // console.log(authentication.data['ingredients']);
  // if (authentication.status !== 200) {
  if (false) {
    console.log("return no access");
    return (
      <>
        <h1> You do not have Authentication </h1>
      </>
    )
  }
  else 
    console.log("protected return child");
    return children;
};
