import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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
			categories: [
				"2021-08-26",
				"2021-07-27",
				"2021-07-06",
				"2021-05-27",
				"2021-04-27",
				"2021-03-27",
				"2021-02-26",
			],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	};

	const [series, setSeries] = useState([
		{
			name: "Físico",
			data: [10500, 4650, 3460, 3680, 3550, 4800, 2096],
		},
		{
			name: "Invertido",
			data: [0, 3500, 5200, 4467, 3070, 3278, 11520],
		},
	]);

	useEffect(
		(usdPrice) => {
			const seriesArs = [
				{
					name: "Físico",
					data: [10500, 4650, 3460, 3680, 3550, 4800, 2096],
				},
				{
					name: "Invertido",
					data: [0, 3500, 5200, 4467, 3070, 3278, 11520],
				},
			];
			const roundUsdValue = (value) => {
				//! It doesnt receive the usdPrice
				return (value / usdPrice).toFixed(2);
			};

			if (usdValues) {
				//setSeries(seriesUsd);
			} else {
				const seriesUsd = [
					{
						name: "Físico",
						data: seriesArs[0].data.map((value) => roundUsdValue(value)),
					},
					{
						name: "Invertido",
						data: seriesArs[1].data.map((value) => roundUsdValue(value)),
					},
				];
				console.log(seriesUsd);
				setSeries(seriesArs);
			}
		},
		[usdValues, usdPrice]
	);

	return <ReactApexChart options={options} series={series} type="area" height={290} />;
}
