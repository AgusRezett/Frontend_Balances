// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// Components
import AreaGraph from "../components/graphs/AreaGraph";
import PhysicalMoneyContainer from "../components/pages/home/PhysicalMoneyContainer";
import InvestedMoneyContainer from "../components/pages/home/InvestedMoneyContainer";

// Objects
const money = {
	physical: {
		underC: 150,
		overC: 1600,
		uala: 346,
	},
	invested: {
		binance: 31.15,
		mdex: 33,
	},
	profit: {
		binance: 0,
		mdex: -2.41,
	},
};

const getTotalPhysical = (money) => {
	return money.physical.underC + money.physical.overC + money.physical.uala;
};

const getTotalInvested = (money, usdPrice) => {
	let total;
	if (usdPrice !== 0) {
		total = Math.round((money.invested.binance + money.invested.mdex) * usdPrice);
	} else {
		total = money.invested.binance + money.invested.mdex;
	}
	return total;
};

const getUsdPrice = (setUsdPrice) => {
	fetch(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			data.forEach((item) => {
				if (item.casa.nombre === "Dolar Blue") {
					setUsdPrice(parseInt(item.casa.venta));
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

export default function Home() {
	const [totalInvested, setTotalInvested] = useState(false);
	const [textTotal, setTextTotal] = useState(" ! invertido");

	const [investedProfit, setInvestedProfit] = useState(false);
	const [textInvested, setTextInvested] = useState(" ! ganancias");

	const [usdPrice, setUsdPrice] = useState(0);
	getUsdPrice(setUsdPrice);

	const [viewWidth, setViewWidth] = useState(0);

	useEffect(() => {
		//? Get the current ars value and convert it to usd
		const totalPriceArs = document.getElementById("total-price-ars");
		const totalPriceUsd = document.getElementById("total-price-usd");

		const cleanArs = parseInt(totalPriceArs.textContent.replace("$", "").replace(".", ""));
		const formatedUsd = new Intl.NumberFormat("de-DE").format(Math.round(cleanArs / usdPrice));
		totalPriceUsd.innerHTML = `$${formatedUsd}`;

		//? Toggle profit value for showing or not
		const profitBtn = document.getElementById("profit-btn");
		if (investedProfit) {
			setTextInvested(" + ganancias");
			profitBtn.classList.add("profit-btn-active");
		} else {
			setTextInvested(" ! ganancias");
			profitBtn.classList.remove("profit-btn-active");
		}

		//? Toggle total money value for showing invested money or not
		const totalBtn = document.getElementById("total-btn");
		if (totalInvested) {
			setTextTotal(" + invertido");
			totalBtn.classList.add("total-btn-active");
		} else {
			setTextTotal(" ! invertido");
			totalBtn.classList.remove("total-btn-active");
		}

		//? Set the section view width
		const pageView = document.getElementById("page-view");
		const changeDisplay = () => {
			setViewWidth(pageView.offsetWidth);
		};
		changeDisplay();
		window.addEventListener("resize", changeDisplay);

		return () => {
			window.removeEventListener("resize", changeDisplay);
		};
	}, [usdPrice, investedProfit, totalInvested]);

	return (
		<main id="page-view">
			<div className="row general-graph-container">
				<div className="principal-sections-container col-md-6">
					<div className="principal-sections-content section-graph">
						<AreaGraph />
					</div>
				</div>
				<div className="principal-sections-container col-sm-12 col-md-6 ">
					<div className="principal-sections-content principal-sections-column">
						<div className="secondary-sections-container col-sm-12">
							<div className="secondary-sections-content">
								<h6>
									Dinero Total Físico
									<span
										onClick={() => {
											setTotalInvested(!totalInvested);
										}}
										className="total-btn"
										id="total-btn"
									>
										{textTotal}
									</span>
								</h6>
								<PhysicalMoneyContainer
									totalInvested={totalInvested}
									getTotalPhysical={getTotalPhysical(money)}
									getTotalInvested={getTotalInvested(money, usdPrice)}
									viewWidth={viewWidth}
								/>
							</div>
						</div>
						<div className="secondary-sections-container col-sm-12">
							<div className="secondary-sections-content">
								<h6>
									Dinero Total Invertido
									<span
										onClick={() => {
											setInvestedProfit(!investedProfit);
										}}
										className="profit-btn"
										id="profit-btn"
									>
										{textInvested}
									</span>
								</h6>
								<InvestedMoneyContainer
									investedProfit={investedProfit}
									money={money}
									viewWidth={viewWidth}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
