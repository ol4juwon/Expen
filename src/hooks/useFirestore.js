import { useReducer, useEffect, useState } from "react";
import { db } from "../provider/config";
import { collection, doc, addDoc, deleteDoc, serverTimestamp as timestamp } from "firebase/firestore";
let initialState = {
	document: null,
	loading: false,
	error: null,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
	case "IS_LOADING":
		return {
			document: null,
			error: null,
			success: null,
			loading: true,
		};
	case "GET_DOCUMENT":
		return {
			document: action.payload,
			error: null,
			success: true,
			loading: false,
		};
	case "ADD_DOCUMENT": 
		return {
			document: action.payload,
			loading: false,
			error: null,
			success: true,
		};
	case "DEL_DOCUMENT_SUCCESS":
		return {
			document: action.payload,
			loading: false,
			error: null,
			success: true,
		};
	case "ERROR":
		return {
			document: null,
			loading: false,
			error: action.payload,
			success: false,
		};
	default:
		return state;
	}
};
export const useFirestore = (c) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);
	// const ref = projectStore.collection(collection);
	const DNotCancelled = (action) => {
		if(!isCancelled){
			dispatch(action);
		}
	};
	const addDocument = async (data) => {
		dispatch({ type: "IS_LOADING" });
		try {
			const createdAt = timestamp.fromDate(new Date());

			const docRef = collection(db, c);
			await addDoc(docRef, {...data, createdAt});
			// const docRef = await ref.add({...data, createdAt});
			DNotCancelled({ type: "ADD_DOCUMENT", payload: docRef });
		} catch (error) {
			DNotCancelled({ type: "ERROR", payload: error });
		}
	};
	// const getDocument = async () => {
	// 	dispatch({ type: "IS_LOADING" });
	// 	try {
	// 		const docRef = collection(db, "transactions");
	// 		await deleteDoc(docRef, {id});
	// 		DNotCancelled({ type: "GET_DOCUMENT", payload: docRef });
	// 	} catch (error) {
	// 		DNotCancelled({ type: "ERROR", payload: error });
	// 	}
	// };

	const delDocument = async (id) => {
		dispatch({ type: "IS_LOADING" });
		console.log(id, typeof deleteDoc);
		try {
			const docRef = doc(db, c, id);
			await deleteDoc(docRef);
			if(!isCancelled){
				dispatch({ type: "DEL_DOCUMENT_SUCCESS"});
			}
		} catch (error) {
			console.log("error",error);
			dispatch({ type: "ERROR", payload: error });
		}
	};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { addDocument, delDocument, response };
};