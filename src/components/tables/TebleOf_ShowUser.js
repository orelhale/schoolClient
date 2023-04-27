import * as React from 'react';
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




export default function TebleOf_ShowUser(props) {

	const [rows, setRows] = React.useState([]);

	let navigate = useNavigate()
	React.useEffect(()=>{
		if(props.dateFromServer){
			console.log("props.dateFromServer = ", props.dateFromServer);
			let arr = props.dateFromServer.map((item)=>{
				let { name, level_permission, email, class_permission, _id } = item
				let date = new Date(item.Date).toLocaleDateString();
				class_permission = !class_permission[0] ? "---" : class_permission.map(item2=> ` ${item2} `)
				return createData(name,  level_permission, email, date, class_permission, _id )
			})

			setRows(arr)
		}
	},[props.dateFromServer])


	const columns = [
		{ id: 'name', label: 'Name', minWidth: 170 },
		{ id: 'Date', label: 'Date', minWidth: 100 },
		{
			id: 'level_permission',
			label: 'Level permission',
			minWidth: 170,
			align: 'right',
			format: (value) => value.toLocaleString('en-US'),
		},
		{
			id: 'email',
			label: 'Email',
			minWidth: 170,
			align: 'right',
			format: (value) => value.toLocaleString('en-US'),
		},
		{
			id: 'class_permission',
			label: 'class_permission',
			minWidth: 50,
			align: 'right',
			format: (value) => value.toFixed(2),
		},
		{
			id: '_id',
			label: 'icon / id',
			minWidth: 100,
			align: 'right',
			format: (value) => value.toFixed(2),
		},
	]
	
	function createData(name, Date, level_permission, email,class_permission, _id) {
		return { name, Date, level_permission, email, class_permission, _id };
	}

		
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
					{columns.map((column) => (
						<TableCell
						sx={{fontWeight: 700}}
							key={column.id}
							align={column.align}
							style={{ minWidth: column.minWidth }}
						>
							{column.label}
						</TableCell>
					))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => {
						return (
							<TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
							{columns.map((column) => {
								const value = row[column.id];
								return (
									<TableCell key={column.id} align={column.align}>
									{column.id == "_id" 
										?  <span style={{display: "flex","justify-content": "space-around"}}> 
												<MyIcon_Edit onClick={()=>{props.setUserToEdit(row); console.log("row = ",row)}}/> 
												<MyIcon_Delete onClick={()=>{console.log("id = ",value)}} />
											</span> 
										: 	column.format && typeof value === 'number'
										? 	column.format(value)
										: 	value
									}
									</TableCell>
								);
							})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			</TableContainer>
		</Paper>
	);
}
