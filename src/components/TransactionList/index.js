/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Trnx.module.css";
const TransactionList = ({trnx}) => {
	console.log(trnx);
	return(
		<ul className={styles.transactions}>
			{trnx && trnx.map((trnx) => (
				<li key={trnx.id}>
					<p className={styles.name}>{trnx.name}</p> 
					<p className={styles.amount}>${trnx.amount}</p>
				</li>
			))}
		</ul>
	);
};

export default TransactionList;