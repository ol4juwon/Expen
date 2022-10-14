import React from "react";
import styles from "./navbar.module.css";
import {Link} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
	const {logout} = useLogout();
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}><Link to="/">Expenso</Link>
				</li>
				<li className=""><Link to="/login">Login</Link></li>
				<li className=""><Link to="/signup">Signup</Link></li>
				<li><button className="btn" onClick={logout}>Logout</button></li>
			</ul>
		</nav>
	);
};

export default Navbar;
