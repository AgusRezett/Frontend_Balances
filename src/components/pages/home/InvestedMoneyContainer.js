import React from "react";

// Components

// Images
import BinanceLogo from "../../../assets/tokens/bnb.png";
import MdexLogo from "../../../assets/tokens/mdx.png";

export default function PhysicalMoneyContainer({ investedProfit, money, viewWidth }) {
	return (
		<div className="money-container">
			<div className="national-currency-container">
				<div className="total-price-container">
					<h3>${investedProfit ? money.invested.binance + money.profit.binance : money.invested.binance}</h3>
					{viewWidth >= 356 ? (
						<div className="icon-container">
							<img src={BinanceLogo} alt="binance-logo" className="icon-flag" />
						</div>
					) : null}
				</div>
			</div>
			<div className="national-currency-container">
				<div className="total-price-container">
					<h3>${investedProfit ? money.invested.mdex + money.profit.mdex : money.invested.mdex}</h3>
					{viewWidth >= 356 ? (
						<div className="icon-container">
							<img src={MdexLogo} alt="mdex-logo" className="icon-flag" />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
