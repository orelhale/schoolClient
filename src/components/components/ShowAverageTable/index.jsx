
import { useContext, useEffect, useState } from "react"
import styles from "./style.module.css"
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);




export default function ShowAverageTable({ labels = [], chartTitle = "title", datasets = [{ datasetsTitle: "", chartData: [] }] }) {
	let [data, setData] = useState(null)

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				display: true,
			},
			title: {
				display: false,
				text: chartTitle,
			},
		},
	};

	useEffect(() => {
		if (datasets) {
			let obj = {
				labels: labels,
				datasets: datasets.map(({ datasetsTitle, chartData }) => ({ label: datasetsTitle, data: chartData, backgroundColor: 'rgba(53, 162, 235, 0.5)' }))
			}
			setData(obj)
		}
	}, [datasets, labels])




	return (
		<div className={styles.ShowAverageTable}>
			{data &&
				<Bar options={options} data={data} />
			}
		</div>
	)
}