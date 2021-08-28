import React from "react";

// Components
import Bubble from "./crypto-bubbles/CryptoBubble";

// Styles
import "../css/navbar.css";

export default function Topnavbar() {
	return (
		<section className="topnavbar">
			<Bubble token="btc" />
			<Bubble token="eth" />
			<Bubble token="mdx" />
		</section>
	);
}
