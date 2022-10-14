import React, {useState} from "react";
import style from "./signup.module.css";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [username, setUsername] = useState("");

	const handleRegister = (e) => {
		e.preventDefault();
		console.log(email, password, confirmPassword, username);
	};
	return (
		<form onSubmit={handleRegister} className={style["signup-form"]}>
			<h2>Signup</h2>
			<label htmlFor="email"><span>Email</span>
				<input 
					type="email" 
					required
					name="email"
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				<span>Username</span>
				<input 
					type="text" 
					required
					name="username" 
					onChange={(e) => setUsername(e.target.value)}
					value={username} />
			</label>
			<label htmlFor="password"><span>Password</span>
				<input 
					type="password" 
					name="password" 
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<label htmlFor="confirm-password"><span>Confirm Password</span>
				<input 
					type="password" 
					required
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					name="confirm-password" 
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</label>
			<button className="btn">Register</button>
		</form>
	);
};

export default Signup;