import React, { useEffect } from 'react';

// Components

// Styles

export default function SwitchCurrency({ setUsdCurrency }) {
	useEffect(() => {
		const checkbox = document.getElementById('checkbox-badge');
		checkbox.addEventListener('change', () => {
			if (checkbox.checked) {
				setUsdCurrency(true);
			} else {
				setUsdCurrency(false);
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
