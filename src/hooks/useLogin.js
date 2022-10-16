import { useEffect, useState } from "react";
import { auth } from "../provider/config";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	// const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setLoading(true);

		try {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {

					// Signed in
					const user = userCredential.user;
					console.log(user);
				// ...
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setError({errorMessage, errorCode});
					// ..
				});

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