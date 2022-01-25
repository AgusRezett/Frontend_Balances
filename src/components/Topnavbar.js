/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';

// Hooks
import { GlobalContext } from '../hooks/useContext/Contexts';

// Functions
import { getUsdPrice } from '../functions/Global';

// Components
import Bubble from './topnav/CryptoBubble';
import SwitchCurrency from './topnav/SwitchCurrency';
import Usd from '../assets/tokens/usd.png';

// Styles
import '../css/navbar.css';

export default function Topnavbar() {
	const { usdPrice, usdCurrency, setUsdCurrency } = useContext(GlobalContext);

	return (
		<div className="topnavbar">
			<div className="currencies-container">
				<Bubble token="BTC" />
				<Bubble token="ETH" />
				<Bubble token="MDX" />
				<div className="crypto-bubble">
					<div>
						<img src={Usd} alt="" />${usdPrice}
					</div>
				</div>
			</div>
			<SwitchCurrency setUsdCurrency={setUsdCurrency} />
		</div>
	);
}
