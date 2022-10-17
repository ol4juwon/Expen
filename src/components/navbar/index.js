import React from "react";
import styles from "./navbar.module.css";
import {Link} from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
const Navbar = () => {
	const {logout} = useLogout();
	const {user}	= useAuthContext();
	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}><Link to="/">Expenso</Link>
				</li>
				{!user && (
					<>
						<li className=""><Link to="/login">Login</Link></li>
						<li className=""><Link to="/signup">Signup</Link></li>
					</>
				)}{user && (
					<>
						<li className="">Hello, {user.displayName}</li>
						<li>
							<button className="btn" onClick={logout}>Logout</button>
						</li>
					</>
				
				) 
				} 
			</ul>
		</nav>
	);
};

export default Navbar;
