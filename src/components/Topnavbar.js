import React from "react";

// Components
import Bubble from "./crypto-bubbles/CryptoBubble";

// Styles
import "../css/navbar.css";

export default function Topnavbar() {
	return (
		<div className="topnavbar">
			<Bubble token="BTC" />
			<Bubble token="ETH" />
			<Bubble token="MDX" />
		</div>
	);
}
