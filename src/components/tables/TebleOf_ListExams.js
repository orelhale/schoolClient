

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import MyIcon_Delete from "../myIcons/MyIcon_Delete"
import MyIcon_Edit from "../myIcons/MyIcon_Edit"


export default function TebleOf_ListExams(props) {
	let defaultMinWidth = 50;
	const columns = [
	  { id: 'index', label: '#', minWidth: 1 },
	  { id: 'name', label: 'Name', minWidth: defaultMinWidth },
	  { id: 'date', label: 'Date', minWidth: defaultMinWidth },
	  { id: 'average', label: 'Average', minWidth: defaultMinWidth },
	];
	

	let style1 = { fontWeight: 700, "font-size": "1.4rem", "width": "15%" }
	let style2 = { fontWeight: 700, "font-size": "1.4rem"}

	const [rows, setRows] = React.useState([]);


	React.useEffect(()=>{
		if(props.AllExams){
			// console.log("props.AllExams = ",props.AllExams);
			let arr = props.AllExams.map((item, i)=>{
				let {examName, date, average} = item
				return {index:`${i + 1}.`, name: examName, date: date, average: average}
			})
			setRows(arr)
		}
	},[])


	return (
		<Paper sx={{width: '85%'}}>
			<TableContainer sx={{ maxHeight: 440 }}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead >
					<TableRow>
						{columns.map((column) => (
							<TableCell sx={column.id == "index" ? style1 : style2}
							key={column.id}
							align={column.align}
							style={{ minWidth: column.minWidth }}
							>
								{column.label}
							</TableCell>
						))}

						<TableCell sx={style2} key={"delete"} style={{ minWidth: 10 }}>{""}</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows.map((row, index_row) => {
						return (
							<TableRow 
							hover 
							role="checkbox" 
							tabIndex={-1} key={row.code} 
							// onClick={()=>{props.AllExams[index_row].examList[0] ? props.setSpecificExam(props.AllExams[index_row]) : props.setNotData("this exam is empty")}}
							>
								{columns.map((column, index_column) => {
									const value = row[column.id];
									return (<>
										<TableCell key={column.id} align={column.align} sx={{"font-size": "1.4rem"}}>
											{column.format && typeof value === 'number' ? column.format(value): value}
										</TableCell>
										{(index_column + 1 == columns.length) &&
											<TableCell key={columns.length} sx={{"font-size": "1.4rem", display:"flex"}}>
												<MyIcon_Edit onClick={()=>{props.AllExams[index_row].examList[0] ? props.setSpecificExam(props.AllExams[index_row]) : props.setNotData("this exam is empty")}}/>
												<span style={{marginRight:"0.5rem"}}></span>
												<MyIcon_Delete onClick={()=>{console.log(props.AllExams[index_row])}}/>
											</TableCell>
										}
									</>);
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


