import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import React from "react";


function App() {
	return (
			<Router>
				<AppRouter/>
			</Router>
	)
}

export default App
