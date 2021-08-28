import React, { useState } from "react";

// Components
import Btc from "../../assets/btc.png";
import Eth from "../../assets/eth.png";
import Mdx from "../../assets/mdx.png";

// Styles

const getTokenPrice = (setTokenPrice, token) => {
	let alt;
	if (token !== "mdx") {
		alt = true;
	} else {
		alt = false;
	}

	fetch(`https://api.huobi.pro/market/trade?symbol=${token}usdt`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (alt) {
				setTokenPrice(Math.round(data.tick.data[0].price));
			} else {
				setTokenPrice(data.tick.data[0].price);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export default function CryptoBubble({ token }) {
	const [tokenPrice, setTokenPrice] = useState(0);
	getTokenPrice(setTokenPrice, token);

	setTimeout(() => {
		getTokenPrice(setTokenPrice, token);
	}, 30000);

	const tokensImgs = [Btc, Eth, Mdx];
	let cryptoImg = null;

	tokensImgs.forEach((img) => {
		if (img.includes(token)) {
			cryptoImg = img;
		}
	});

	return (
		<div className="crypto-bubble">
			<div>
				<img src={cryptoImg} alt="" />
				<p>${tokenPrice}</p>
			</div>
		</div>
	);
}
