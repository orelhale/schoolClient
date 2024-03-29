import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import MyIcon_Edit from '../myIcons/MyIcon_Edit';
import MyIcon_Delete from '../myIcons/MyIcon_Delete';
import { display } from '@mui/system';
import GenericTable from '../tables/GenericTable';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import MyIcon_Mail from '../myIcons/MyIcon_Mail';
import DataContext from '../../context/DataContext';




export default function TebleOf_ShowUser({ setUserToEdit,dateFromServer }) {

	const [dataRows, setDataRows] = useState(null);
	let { setPopupBody } = useContext(DataContext)

	useEffect(() => {
		setDataRows(dateFromServer)
		axios.get("http://localhost:4000/admin/getAllUsers")
			.then(data => {
				let arr = data.data.map((item) => {
					let { name, level_permission, email, class_permission, _id } = item
					let date = new Date(item.Date).toLocaleDateString();
					class_permission = !class_permission[0] ? "---" : class_permission.map(item2 => ` ${item2} `)
					return { name, level_permission, email, date, class_permission, _id }
				})
				setDataRows(arr)
			})
			.catch((err) => {
				console.log(err);
			})
	}, [])


	const styleContainerTable = { maxWidth: "100%", overflow: 'hidden' };
	const styleAllColumns = { fontWeight: 750 };
	const columns = [
		{
			id: 'name',
			label: 'Name',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'date',
			label: 'Date',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'level_permission',
			label: 'Role',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'email',
			label: 'Email',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		// {
		// 	id: 'class_permission',
		// 	label: 'class_permission',
		// 	styleColumn: { minWidth: 50 },
		// 	styleRow: { minWidth: 50 }
		// },
		{
			id: '_id',
			label: 'icon',
			styleColumn: { width: 50 },
			styleRow: { width: 30, padding: "16px 16px" }
		},
	]



	return (<>
		<GenericTable
			defultStyleHeaders={true}
			columns={columns}
			dataRows={dataRows}
			styleContainerTable={styleContainerTable}
			styleAllColumns={styleAllColumns}
			icons={(row, value) => {
				return (
					<span style={{ display: "flex" }}>
						<MyIcon_Edit onClick={() => { setUserToEdit(row); console.log("row = ", row) }} />
						<span style={{ marginRight: "10px" }} />
						<MyIcon_Delete onClick={() => { console.log("id = ", value) }} />
						<span style={{ marginRight: "10px" }} />
						<MyIcon_Mail onClick={()=>{setPopupBody({element:<h1>orel</h1>})}}/>
					</span>
				)
			}}
		/>
	</>);
}
