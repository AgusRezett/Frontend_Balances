//? Get the current blue usd price in Argentina
export const getUsdPrice = (setUsdPrice) => {
	console.log(setUsdPrice);
	fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			data.forEach((item) => {
				if (item.casa.nombre === 'Dolar Blue') {
					setUsdPrice(parseInt(item.casa.venta));
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
