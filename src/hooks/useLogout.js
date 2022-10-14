import { useEffect, useState } from "react";
import { projectAuth } from "../provider/firebase";
import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setLoading(true);

		try {
			await projectAuth.signOut();
			dispatch({ type: "LOGOUT" });
			if(!isCancelled) {
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
		setLoading(false);
	};

	useEffect(() => {
		return () => {
			setIsCancelled(true);
		};
	}, []);

	return { error, loading, logout };
};