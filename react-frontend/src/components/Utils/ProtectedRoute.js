import React from "react";
import { useAuth } from '../context/AuthProvider';
import styled from "styled-components";

// import { Auth } from "./Auth";

const BigWrapper = styled.section`
  padding: 0;
  background: white;
  width: 100%;
  height: ${props => props.height};
`;

const Title = styled.h1`
  font-size: ${props => props.fontSize}em;
  text-align: center;
  color: black;
  padding-bottom: 0.1em;
  font-weight: bold;
`;

export const ProtectedRoute = ({children}) => {
	const {Auth} = useAuth();

	if (Auth.token === null) {
		return (
			<>
			<BigWrapper height = "50px"> </BigWrapper>
			<Title fontSize = "2"> Please log in or register to start finding recipes! </Title>
			</>
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
