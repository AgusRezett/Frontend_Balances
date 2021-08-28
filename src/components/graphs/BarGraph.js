import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BarGraph() {
	const series = [
		{
			name: "ARS",
			data: [10500, 8150, 8660, 8147, 6620, 8078, 7676],
		},
	];

	const options = {
		chart: {
			height: 350,
			type: "line",
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		title: {
			text: "Tendencia de Dinero por Mes",
			align: "left",
		},
		grid: {
			row: {
				colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
		},
	};

	return <ReactApexChart options={options} series={series} type="line" height={290} />;
}
