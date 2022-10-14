import { useEffect, useState } from "react";
import { projectAuth } from "../provider/firebase";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setLoading(true);

		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password);

			if (!res) {
				throw new Error("Could not complete the log in");
			}
			dispatch({ type: "LOGIN", payload: res.user });
			if (!isCancelled) {
				setLoading(false);
				setError(null);
			}
		}
		catch (err) {
			if(!isCancelled) {
				setError(err.message);
				setLoading(false);
			}
		}
	};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { error, loading, login };
};