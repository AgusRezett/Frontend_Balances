export const getTotalPhysical = (money) => {
	return money.physical.underC + money.physical.overC + money.physical.uala;
};

export const getTotalInvested = (money, usdPrice) => {
	let total;
	if (usdPrice !== 0) {
		total = Math.round((money.invested.binance + money.invested.mdex) * usdPrice);
	} else {
		total = money.invested.binance + money.invested.mdex;
	}
	return total;
};

export const getInvestedAvailable = (money, usdPrice) => {
	let total;
	if (usdPrice !== 0) {
		total = Math.round((money.invested.binance + money.profit.binance) * usdPrice);
	} else {
		total = money.invested.binance + money.profit.binance;
	}
	return total;
};
