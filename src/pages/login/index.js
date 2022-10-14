import React, { useState } from "react";
import styles from "./login.module.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(email, password);
	};
	return (
		<form className={styles["login-form"]} onSubmit={handleLogin}>
			<h2>Login</h2>
			<label htmlFor="email"><span>Email</span>
				<input type="email" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value) } />
			</label>
			<label htmlFor="password"><span>Password</span>
				<input type="password" name="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)} />
			</label>
			<button className="btn">Login</button>
		</form>
	);
};

export default Login;