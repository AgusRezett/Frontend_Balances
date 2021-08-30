import React, { useState } from "react";

// Components
import Bubble from "./topnav/CryptoBubble";
import SwitchCurrency from "./topnav/SwitchCurrency";
import Usd from "../assets/tokens/usd.png";

// Styles
import "../css/navbar.css";

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

export default function Topnavbar({ setUsdValues, usdValues }) {
	const [usdPrice, setUsdPrice] = useState(0);
	getUsdPrice(setUsdPrice);
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
			<SwitchCurrency setUsdValues={setUsdValues} usdValues={usdValues} usdPrice={usdPrice} />
		</div>
	);
}
