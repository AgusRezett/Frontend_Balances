import React, { useEffect, useState } from "react";

// Components
import Btc from "../../assets/tokens/btc.png";
import Eth from "../../assets/tokens/eth.png";
import Mdx from "../../assets/tokens/mdx.png";

// Styles

const getTokenPrice = (setTokenPrice, token) => {
	let api;
	if (token !== "MDX") {
		api = `https://api.binance.com/api/v3/ticker/price?symbol=${token}USDT`;
	} else {
		api = `https://api.huobi.pro/market/trade?symbol=mdxusdt`;
	}
	fetch(api)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (api.includes("binance")) {
				setTokenPrice(parseFloat(data.price).toFixed(2));
			} else {
				setTokenPrice(parseFloat(data.tick.data[0].price).toFixed(2));
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export default function CryptoBubble({ token }) {
	const [tokenPrice, setTokenPrice] = useState(0);
	const [cryptoImg, setCryptoImg] = useState(null);

	useEffect(() => {
		//* Initiliaze the bubble token price and then update it every 30 seconds
		getTokenPrice(setTokenPrice, token);
		setTimeout(() => {
			getTokenPrice(setTokenPrice, token);
		}, 30000);

		// Get the apropiate image for the token
		const tokensImgs = [Btc, Eth, Mdx];
		tokensImgs.forEach((img) => {
			if (img.includes(token.toLowerCase())) {
				setCryptoImg(img);
			}
		});
	}, [token]);

	return (
		<div className="crypto-bubble">
			<div>
				<img src={cryptoImg} alt="" />${tokenPrice}
			</div>
		</div>
	);
}
