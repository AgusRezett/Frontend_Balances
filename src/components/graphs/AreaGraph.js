import React from "react";
import ReactApexChart from "react-apexcharts";

export default function AreaGraph() {
	const series = [
		{
			name: "Físico",
			data: [10500, 4650, 3460, 3680, 3550, 4800, 2096],
		},
		{
			name: "Invertido",
			data: [0, 3500, 5200, 4467, 3070, 3278, 11520],
		},
	];

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

	return <ReactApexChart options={options} series={series} type="area" height={290} />;
}
