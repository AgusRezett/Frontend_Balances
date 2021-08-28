import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages routes
import Home from "./pages/Home";

// Components
import Topnavbar from "./components/Topnavbar";
import Sidenavbar from "./components/Sidenavbar";
/* import Footer from "./components/Footer"; */

// Styles
import "./css/generalStyles.css";
import "./css/home.css";
import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
	return (
		<div className="dashboard-app">
			<Router basename="/Balances">
				<Sidenavbar />
				<section>
					<Topnavbar />
					<Switch>
						<Route path="/" exact component={Home} />
					</Switch>
				</section>
				{/* <Footer /> */}
			</Router>
		</div>
	);
}
