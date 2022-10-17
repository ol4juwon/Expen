/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Trnx.module.css";
import { useFirestore } from "../../hooks/useFirestore";
const TransactionList = ({trnx}) => {
	const {delDocument} = useFirestore("transactions");
	console.log(trnx);
	const totalAMount  = trnx.reduce((acc, curr) => {
		return acc + parseInt(curr.amount);
	}, 0);
	return(
		<ul className={styles.transactions}>
			{trnx && trnx.map((trnx) => (
				<li key={trnx.id}>
					<p className={styles.name}>{trnx.name}</p> 
					<p className={styles.amount}>${trnx.amount}</p>
					<button onClick={(e) =>{ 
						e.preventDefault();
						delDocument(trnx.id);}}>X</button>
				</li>
			))}

			<li className={styles.total}>Total Amount: {totalAMount} </li>
		</ul>
	);
};

export default TransactionList;