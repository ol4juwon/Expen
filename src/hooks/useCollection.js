import { useEffect, useRef, useState } from "react";
import { db } from "../provider/config";
import { collection, onSnapshot } from "firebase/firestore";
export const useCollection = (c, _query, _orderBy) => {
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState(null);
	const [loading, setLoading] = useState(false);
	let query;
	let orderBy;
	if(_query)
		query = useRef(_query);
	if(_orderBy)
		orderBy = useRef(_orderBy);

	useEffect(() => {
		setLoading(true);
		try{
			const ref = collection(db, c);

			const unsubscribe = onSnapshot(ref, (querySnapshot) => {
				let results = [];
				querySnapshot.docs.forEach((doc) => {
					results.push({...doc.data(), id: doc.id});
				});
				setDocuments(results);
				setLoading(false);
			});
			return () => unsubscribe();
		}catch(e){
			setError(e);
			setLoading(false);
		}
	}, [c,query,orderBy]);

	return { documents, error, loading };
};