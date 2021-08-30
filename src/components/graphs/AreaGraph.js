import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

// Data
import totalMoneyGraph from "../../data/totalMoneyGraph.json";

export default function AreaGraph({ usdValues, usdPrice }) {
	const options = {
		chart: {
			height: 350,
			type: "area",
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "smooth",
		},
		title: {
			text: "Tendencia de Dinero (ARS)",
			align: "left",
		},
		xaxis: {
			type: "date",
			categories: totalMoneyGraph.categories,
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};

	const [series, setSeries] = useState(totalMoneyGraph.series);
	const [executed, setExecuted] = useState(false);

	useEffect(() => {
		const roundUsdValue = (value) => {
			return (value / usdPrice).toFixed(2);
		};

		if (usdValues) {
			if (!executed) {
				const seriesUsd = [
					{
						name: "Físico",
						data: series[0].data.map((value) => roundUsdValue(value)),
					},
					{
						name: "Invertido",
						data: series[1].data.map((value) => roundUsdValue(value)),
					},
				];
				setSeries(seriesUsd);
				setExecuted(true);
			}
		} else {
			setSeries(totalMoneyGraph.series);
			setExecuted(false);
		}
	}, [usdValues, usdPrice, series, executed]);

	return <ReactApexChart options={options} series={series} type="area" height={290} />;
}
