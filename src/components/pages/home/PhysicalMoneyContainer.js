import React from "react";
import { Icon } from "rsuite";

// Components

// Images
import ArgentineFlag from "../../../assets/flags/argentine.png";
import UsaFlag from "../../../assets/flags/usa.png";

export default function PhysicalMoneyContainer({ totalInvested, getTotalPhysical, getTotalInvested, viewWidth }) {
	return (
		<div className="money-container">
			<div className="national-currency-container">
				<div className="total-price-container">
					<h3 id="total-price-ars">
						${totalInvested ? getTotalPhysical + getTotalInvested : getTotalPhysical}
					</h3>
					{viewWidth >= 356 ? (
						<div className="icon-container">
							<img src={ArgentineFlag} alt="argentine-flag" className="icon-flag" />
						</div>
					) : null}
				</div>
			</div>
			<span>
				<Icon icon="exchange" />
			</span>
			<div className="national-currency-container">
				<div className="total-price-container">
					{viewWidth >= 356 ? (
						<div className="icon-container">
							<img src={UsaFlag} alt="united-states-flag" className="icon-flag" />
						</div>
					) : null}
					<h3 id="total-price-usd">$0</h3>
				</div>
			</div>
		</div>
	);
}
