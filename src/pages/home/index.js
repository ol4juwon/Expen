import React, {  } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import NewTransaction from "../../components/NewTransaction";
import styles from  "./home.module.css";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "../../components/TransactionList";
import { LineWave } from "react-loader-spinner";
const Home = () => {
	const {user} = useAuthContext();
	const { documents, error } = useCollection("transactions", ["uid", "==", user.uid], ["createdAt", "desc"]);

	// console.log(getDocument().then((res) => console.log(res)).catch());

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				transaction List
				{error && <div>{error}</div>}
				{!documents && <LineWave />}
				{ documents && <TransactionList trnx={documents} />
				}
			</div>
			<div className={styles.sidebar}>
				<NewTransaction uid={user.uid} />
			</div>
		</div>
	);
};

export default Home;
