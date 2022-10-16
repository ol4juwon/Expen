import React from "react";
import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { authIsReady, user } = useAuthContext();
	return (
		<div className="App">
			{authIsReady && (<Router>
				<Navbar />
				<Routes>
					<Route path="/" exact element={user ? <Home /> : <Navigate to="/login" />} />
					<Route path="/login" exact element={!user? <Login /> : <Navigate to={"/"}/>} />
					<Route path="/signup" exact element={user ? <Navigate to="/" /> : <Signup />} />
				</Routes>
			</Router>)}
		</div>
	);
}

export default App;
