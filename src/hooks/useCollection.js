import { useEffect, useRef, useState } from "react";
import { db } from "../provider/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
export const useCollection = (c, _query, _orderBy) => {
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState(null);
	const [loading, setLoading] = useState(false);
	let q;
	let o;
	if(_query)
		q = useRef(_query).current;
	if(_orderBy)
		o = useRef(_orderBy).current;

	useEffect(() => {
		setLoading(true);
		try{
			let ref = collection(db, c);
			console.log(typeof where, typeof query, );
			if(q){
				console.log("q", q);
				ref = query(ref, where(...q));}
			// if(o.current)
			// 	ref = query(ref, orderBy(o.current.field, o.current.direction , limit(10)));
			const unsubscribe = onSnapshot(ref, (snapshot) => {
				let docs = [];
				snapshot.forEach((doc) => {
					docs.push({ id: doc.id, ...doc.data() });
				});
				setDocuments(docs);
				setLoading(false);
				setError(null);
			});
			return () => {
				unsubscribe();
			};
		}catch(e){
			console.log(e);
			setError(e);
			setLoading(false);
		}
		setLoading(false);
	}, [c,q,o]);

	return { documents, error, loading };
};