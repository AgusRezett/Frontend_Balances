import React, { useEffect, useState } from "react";

// Components

// Images
import BinanceLogo from "../../../assets/tokens/bnb.png";
import MdexLogo from "../../../assets/tokens/mdx.png";

export default function PhysicalMoneyContainer({ investedProfit, money, viewWidth, usdValues }) {
	const [roundValue, setRoundValue] = useState(0);

	useEffect(() => {
		if (usdValues) {
			setRoundValue(2);
		} else {
			setRoundValue(0);
		}
	}, [roundValue, usdValues]);

	return (
		<div className="money-container">
			<div className="national-currency-container">
				<div className="total-price-container">
					<h3>
						$
						{investedProfit
							? (parseFloat(money.invested.binance) + parseFloat(money.profit.binance)).toFixed(
									roundValue
							  )
							: money.invested.binance}
					</h3>
					{viewWidth >= 356 ? (
						<a
							href="https://www.binance.com/es/my/wallet/account/main"
							target="_blank"
							rel="noreferrer"
							className="icon-container"
						>
							<img src={BinanceLogo} alt="binance-logo" className="icon-flag" />
						</a>
					) : null}
				</div>
			</div>
			<div className="national-currency-container">
				<div className="total-price-container">
					<h3>
						$
						{investedProfit
							? (parseFloat(money.invested.mdex) + parseFloat(money.profit.mdex)).toFixed(roundValue)
							: money.invested.mdex}
					</h3>
					{viewWidth >= 356 ? (
						<a
							href="https://mdex.com/#/pool/lockup/mdx"
							target="_blank"
							rel="noreferrer"
							className="icon-container"
						>
							<img src={MdexLogo} alt="mdex-logo" className="icon-flag" />
						</a>
					) : null}
				</div>
			</div>
		</div>
	);
}
