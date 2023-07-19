import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

let backgroundColorList = {
	'Red': 'rgba(255, 99, 132, 0.2)',
	'Blue': 'rgba(54, 162, 235, 0.2)',
	'Yellow': 'rgba(255, 206, 86, 0.2)',
	'Green': 'rgba(75, 192, 192, 0.2)',
	'Purple': 'rgba(153, 102, 255, 0.2)',
	'Orange': 'rgba(255, 159, 64, 0.2)',
}

let borderColorList = {
	'Red': 'rgba(255, 99, 132, 1)',
	'Blue': 'rgba(54, 162, 235, 1)',
	'Yellow': 'rgba(255, 206, 86, 1)',
	'Green': 'rgba(75, 192, 192, 1)',
	'Purple': 'rgba(153, 102, 255, 1)',
	'Orange': 'rgba(255, 159, 64, 1)',
}
let setColor = (arr = []) => {
}
export const data = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
		{
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
			],
			borderWidth: 1,
		},
	],
};




export default function ShowAveragePie({ labels = [], chartTitle = "title", datasets = [{ datasetsTitle: "", chartData: [], colors: [] }] }) {
	// export default function ShowAveragePie({ labels = [], chartTitle = "title", datasets = [{ datasetsTitle: "", chartData: [] }] }) {
	// let [data, setData] = useState(null)

	// const options = {
	// 	responsive: true,
	// 	plugins: {
	// 		legend: {
	// 			position: 'top',
	// 		},
	// 		title: {
	// 			display: true,
	// 			text: chartTitle,
	// 		},
	// 	},
	// };
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
				display: false,
			},
			title: {
				display: false,
				text: chartTitle,
			},
		},
	};


	let [dataChart , setDataChart] = useState(null)

	useEffect(() => {
		if (datasets) {
			let obj = {
				labels: labels,
				datasets: datasets.map(({ datasetsTitle, chartData, colors }) => ({
					label: datasetsTitle,
					data: chartData,
					borderWidth: 1,
					backgroundColor: colors.map(c => backgroundColorList[c]),
					borderColor: colors.map(c => borderColorList[c]) 
				})),
			}
			setDataChart(obj)
		}
	}, [datasets, labels])



	return (
		<div className={styles.ShowAveragePie}>
			{dataChart &&
				<Pie data={dataChart} options={options} />
			}
		</div>
	)
}