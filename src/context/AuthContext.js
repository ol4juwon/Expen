import React from "react";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
	case "LOGIN":
		return {
			...state,
			user: action.payload,
		};
	case "LOGOUT":
		return {
			...state,
			user: null,
		};
	default:
		return state;
	}
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {user: null});
	console.log("Auth user?", state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};