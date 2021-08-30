import React, { useEffect } from "react";

// Components

// Styles

export default function SwitchCurrency({ setUsdValues }) {
	useEffect(() => {
		const checkbox = document.getElementById("checkbox-badge");
		checkbox.addEventListener("change", () => {
			if (checkbox.checked) {
				setUsdValues(true);
			} else {
				setUsdValues(false);
			}
		});
	});

	return (
		<div className="toggle-currency-container">
			<label className="switch-currency" htmlFor="checkbox-badge">
				<input type="checkbox" id="checkbox-badge" />
				<span className="slider" />
			</label>
		</div>
	);
}
