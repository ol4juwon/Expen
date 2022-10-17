import React, { useState } from "react";
import { db } from "../../provider/config";
import { collection, addDoc } from "firebase/firestore";
// eslint-disable-next-line react/prop-types
const NewTransaction = ({uid}) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [paymentType, setPaymentType] = useState("cash");
	const [category, setCategory] = useState("food");
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
				<label>
					<span>Payment Type:</span>
					<select
						value={paymentType}
						required
						onChange={(e) => setPaymentType(e.target.value)}
					>
						<option value="cash">Cash</option>
						<option value="card">Card</option>
						<option value="bank">Bank Transfer</option>
					</select>
				</label>
				<label>
					<span>Category:</span>
					<select
						value={category}
						required
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="food">Food</option>
						<option value="shopping">Shopping</option>
						<option value="entertainment">Entertainment</option>
						<option value="transport">Transport</option>
						<option value="bills">Bills</option>
						<option value="other">Other</option>
					</select>
				</label>
				<button type="submit">Add Transaction</button>
			</form>
		</>
	);
};

export default NewTransaction;
