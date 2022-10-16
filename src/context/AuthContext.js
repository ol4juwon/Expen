import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { auth } from "../provider/config";

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
	case "AUTH_READY":
		return {
			...state,
			user: action.payload,
			authIsReady: true,
		};
	default:
		return state;
	}
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false
	});

	useEffect(() => {
		const unsub =	auth.onAuthStateChanged((user) => {
			dispatch({type: "AUTH_READY", payload: user});
			unsub();
		});
	}, []);
	console.log("Auth user?", state);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};