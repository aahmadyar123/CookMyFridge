import React from "react";
import { Auth } from "./Auth";

export const ProtectedRoute = ({children}) => {
	console.log("In protect before auth");
	Auth().then( (result) => {
		if (result === false) {
			console.log("return no access");
			return (
				<>
				  <h1> You do not have Authentication </h1>
				</>
			);
		}

		else {
			console.log("protected return child");
			console.log(children);
			return children;
		}
	});
}
