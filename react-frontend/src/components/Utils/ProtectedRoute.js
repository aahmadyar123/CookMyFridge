import React from "react";
import { useAuth } from '../context/AuthProvider';

// import { Auth } from "./Auth";

export const ProtectedRoute = ({children}) => {
	const {value} = useAuth();

	if (value.token === null) {
		return (
			<h1> You do not have Authentication </h1>
		);
	} else {
		return children;
	}
	// console.log("In protect before auth");


	// Auth().then( (result) => {
	// 	if (result === false) {
	// 		console.log("return no access");
	// 	}

	// 	else {
	// 		console.log("protected return child");
	// 		console.log(children);
	// 		return children;
	// 	}
	// });
}
