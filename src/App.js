import React, { useState, useEffect } from "react";
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
	// eslint-disable-next-line no-unused-vars
	const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

	const changeDisplay = () => {
		setDisplayWidth(window.innerWidth);
	};

	const [usdValues, setUsdValues] = useState(false);
	const [usdPrice, setUsdPrice] = useState(0);
	const getUsdPrice = (setUsdPrice) => {
		fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				data.forEach((item) => {
					if (item.casa.nombre === "Dolar Blue") {
						setUsdPrice(parseInt(item.casa.venta));
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUsdPrice(setUsdPrice);
		window.addEventListener("resize", changeDisplay);

		return () => {
			window.removeEventListener("resize", changeDisplay);
		};
	}, []);

	return (
		<div className="dashboard-app">
			<Router basename="/Balances">
				<Sidenavbar />
				<section>
					<Topnavbar setUsdValues={setUsdValues} usdValues={usdValues} usdPrice={usdPrice} />
					<Switch>
						<Route path="/" exact>
							<Home usdValues={usdValues} usdPrice={usdPrice} />
						</Route>
					</Switch>
				</section>
				{/* <Footer /> */}
			</Router>
		</div>
	);
}
