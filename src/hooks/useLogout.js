import { useEffect, useState } from "react";
import { auth } from "../provider/config";
import { signOut } from "firebase/auth";
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
			signOut(auth).then(() => {
				// Sign-out successful.
				console.log("Sign-out successful.");
			}).catch((error) => {
				// An error happened.
				console.log("An error happened.", error);
			});

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