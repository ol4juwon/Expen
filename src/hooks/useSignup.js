import { useState, useEffect } from "react";
import { projectAuth } from "../provider/firebase";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName) => {
		setError(null);
		setLoading(true);

		try {
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);
			if (!res) {
				throw new Error("Could not complete the signup");
			}
			await res.user.updateProfile({ displayName });
			dispatch({ type: "LOGIN", payload: res.user });
			if (!isCancelled) {
				setLoading(false);
				setError(null);
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message);
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);
	return { error, loading, signup };
};
