
import { useContext, useEffect, useState, Fragment } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';



function Row(props) {
  const { row ,funcEditClass, refreshStateAfterDaleteClass} = props;

  const [open, setOpen] = useState(false);
  

  let deleteClassAndHisStudent = (classToDelete)=>{
	console.log("classToDelete = ",classToDelete);
	axios.delete(`http://localhost:4000/admin/deleteClassAndAllHisStudents?classToDelete=${classToDelete}`)
	.then(
		(data)=>{
			// console.log("Data from server = ",data.data)
			refreshStateAfterDaleteClass()
		},
		(err)=>{console.log("err in deleteClassAndAllHisStudents")}
	)
  }


  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
			{/* תוכן השורות - עבור שמירת כיתות */}
			<TableCell>
				<IconButton
					aria-label="expand row"
					size="small"
					onClick={() => setOpen(!open)}
				>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</TableCell>
			<TableCell component="th" scope="row">{row.nameOfClass}</TableCell>
			<TableCell>{row.numberOfStudents}</TableCell>

			{/* מחזיק את האייקונים- עריכה ומחיקה */}
			<TableCell sx={{display: "flex"}}>
				{/* אייקון עפרון - עריכת כיתה */}
				<Avatar sx={{height: "2.2rem", width: "2.2rem" , backgroundColor: "#912eff"}}>
					<EditIcon onClick={()=>{funcEditClass()}}/>
				</Avatar>

				{/* אייקון פח אשפה - מוחק כיתה */}
        		<IconButton sx={{padding: "0rem"}} onClick={()=>{deleteClassAndHisStudent(row._id)}}>
					<DeleteIcon sx={{fontSize: "2rem"}} color="error" />
				</IconButton>
			</TableCell>
			{/* תוכן השורות - עבור שמירת כיתות */}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: "0.2rem 2rem" }}>
					
					<Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 500}}>
						Students List
					</Typography>
					{/* תוכן השורות - עבור רשימת תלמידים */}
					<Table size="small" aria-label="purchases">
						<TableHead>
							<TableRow>
								<TableCell sx={{fontWeight: 700}}>Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >
							
							{row.listStudents.map((listStudentsRow) => (
								<TableRow key={listStudentsRow.nameStudent}  >
									<TableCell  component="th" scope="row">{listStudentsRow.nameStudent}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{/* תוכן השורות - עבור רשימת תלמידים */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </Fragment>
  );
}



export default function TebleOf_DataOfTheClasses(props) {
	
	// let [rows, setRows] = useState([])
	let [doOneTime, setDoOneTime] = useState(false)
	
	//  מביא את רשימת את כל הכיתות והתלמידים שלהם
	//  rows ומכניס אותם לתוך  
	useEffect(()=>{
		// בודק שריאקט לא מרנדרת פעמים
		// בודק שאין הסטייט כלום - כיון שיש פעמים שהסטייט מלא כגון אחרי עדכון כיתה או הוספת כיתה
		if(doOneTime && !props.rows[0]){
			console.log("props.rows = ", props.rows);
			axios.get("http://localhost:4000/admin/getListOfAllTheClassesWithStudents")
			.then(
				(data)=>{
					let listOfAllClasses = data.data					
					// console.log("listOfAllClasses = ",listOfAllClasses);
					let arrToRows = listOfAllClasses.map((item, i)=>{
						item.numberOfStudents = item.listStudents.length;
						return item
					})
					// console.log("arrToRows = ",arrToRows);
					
					props.setRows(arrToRows)
				},
				()=>{
					console.log("Err in getListOfAllTheClassesWithStudents");
				}
			)
		}
	},[doOneTime])

	useEffect(()=>{
		if(doOneTime == false){
			setDoOneTime(true)
		}
	},[doOneTime])


	// אחרי שמוחקים כיתה מהשרת - הפונקציה הזו מוחקת את אותה כיתה "המערך הכיתות" (הסטייט) 
	// אלא וזה גורם שלא צריך לבקש מהשרת את הרשימה המעודכנת של הכיתות
	let refreshStateAfterDaleteClass = (index_thisRow)=>{
		let copyRows = [...props.rows]
		copyRows.splice(index_thisRow, 1)
		props.setRows(copyRows)
	}

	
	return (<>
		{props.rows[0] &&
		<TableContainer component={Paper}>
		<Table aria-label="collapsible table" >
			<TableHead>
			<TableRow>
				<TableCell />
				<TableCell>Class name</TableCell>
				<TableCell >Number of students</TableCell>
				<TableCell></TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{props.rows.map((row, index_thisRow) => (
				<Row key={row.nameOfClass} row={row} refreshStateAfterDaleteClass={()=>{return refreshStateAfterDaleteClass(index_thisRow)}} funcEditClass={()=>{
					props.sendSetClassToEdit(row)
				}}/>
				))}
			</TableBody>
		</Table>
		</TableContainer>
			}
		</>
	);
}