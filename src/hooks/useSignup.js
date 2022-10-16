import { useState, useEffect } from "react";
import { auth } from "../provider/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	// const { dispatch } = useAuthContext();

	const signup = (email, password) => {
		setError(null);
		setLoading(true);

		try {
			createUserWithEmailAndPassword(auth, email, password)
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
				}
				);
			setLoading(false);
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
	return { error, loading, signup };
};
