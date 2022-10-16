import React, { useState } from "react";
import { db } from "../../provider/config";
import { collection, addDoc } from "firebase/firestore";
// eslint-disable-next-line react/prop-types
const NewTransaction = ({uid}) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	// const { addDocument , response} = useFirestore("transactions");
	const handleAdd = async (e) => {
		e.preventDefault();
		console.log(name, amount, uid);
	
		const docRef = collection(db, "transactions");
		await addDoc(docRef, {name, amount, uid});
	};


	return (
		<>
			<h3>Add Transaction</h3>
			<form onSubmit={handleAdd}>
				<label>
					<span>Transaction Name</span>
					<input
						required
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					<span>Amount ($):</span>
					<input
						required
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
				</label>
				<button type="submit">Add Transaction</button>
			</form>
		</>
	);
};

export default NewTransaction;
