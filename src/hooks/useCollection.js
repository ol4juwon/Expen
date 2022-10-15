import { useEffect, useRef, useState } from "react";
import { projectStore } from "../provider/firebase";
export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;
	useEffect(() => {
		setLoading(true);
		let ref = projectStore.collection(collection);
		if(query){
			ref = ref.where(...query);
		}
		if(orderBy){
			ref = ref.orderBy(...orderBy);
		}
		let unsubscribe = ref.onSnapshot((snap) => {
			let documents = [];
			snap.forEach(doc => {
				documents.push({...doc.data(), id: doc.id});
			});
			setDocuments(documents);
			setError(null);
		}
		, (err) => {
			setError(err);
			console.log(err);
		}
		);
		setLoading(false);
		return () => unsubscribe();
	}, [collection, query, orderBy]);


	return { documents, error, loading };
};