import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages routes
import Home from './pages/Home';

// Hooks
import { GlobalContext } from './hooks/useContext/Contexts';

// Functions
import { getUsdPrice } from './functions/Global';

// Components
import Topnavbar from './components/Topnavbar';
import Sidenavbar from './components/Sidenavbar';
/* import Footer from "./components/Footer"; */

// Styles
import './css/generalStyles.css';
import './css/home.css';
import 'rsuite/dist/styles/rsuite-default.css';

export default function App() {
	// eslint-disable-next-line no-unused-vars
	const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

	const changeDisplay = () => {
		setDisplayWidth(window.innerWidth);
	};

	const [usdCurrency, setUsdCurrency] = useState(false);
	const [usdPrice, setUsdPrice] = useState(0);

	useEffect(() => {
		getUsdPrice(setUsdPrice);
		window.addEventListener('resize', changeDisplay);

		return () => {
			window.removeEventListener('resize', changeDisplay);
		};
	}, []);

	return (
		<div className="dashboard-app">
			<Router basename="/Balances">
				<GlobalContext.Provider
					value={{
						usdPrice,
						setUsdPrice,
						usdCurrency,
						setUsdCurrency,
					}}
				>
					<Sidenavbar />
					<section>
						<Topnavbar />
						<Switch>
							<Route path="/" exact>
								<Home usdValues={usdCurrency} usdPrice={usdPrice} />
							</Route>
						</Switch>
					</section>
				</GlobalContext.Provider>
				{/* <Footer /> */}
			</Router>
		</div>
	);
}
