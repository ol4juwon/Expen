import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/navbar";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/signup" exact element={<Signup />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
