
import { useEffect, useState, useContext } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import axios from 'axios';
import DataContext from '../../context/DataContext';

// icon
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import LogoutIcon from '@mui/icons-material/Logout';
import DvrIcon from '@mui/icons-material/Dvr';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

// ****** #1# s  ******
let getListClassFromServer = async (functionToDo) => {
	return await axios.get("http://localhost:4000/admin/getListOf_ClassNameAndClassId")
		.then(
			(data) => {
				functionToDo(data.data)
			},
			(err) => { console.log("err in function \"getListClassFromServer\" "); },
		)
};



let ListButtonOfTeacher = (props) => {
	let { classId, setClassId, setUserData, userData } = useContext(DataContext)

	let list = (userData && userData.class_permission) || []

	const drawerWidth = 240;
	const navigate = useNavigate()

	let [listClasses, setListClasses] = useState();

	useEffect(() => {
		getListClassFromServer((data) => {
			// console.log("data = ",data);
			setListClasses(data);
		})
	}, [])


	// פונקצייה: מקבלת את כל נתוני הכיתות ומחזירה מערך שמכיל רק את השמות של הכיתות 
	function getArrayWithOnlyNameOfClass(list) {
		return list.map(item => item.nameOfClass)
	}


	// 				פונקצייה: שמחזירה מערך של המזהים של הכיתות
	// פרמטר ראשון: רשימת כיתות שמכילה גם את השמות של הכיתות וגם את המזהה שלהם
	// 										 פרמטר שני: מער שמכיל רק את השמות של הכיתות
	function getArrayWithOnlyClassId(list, listNameOfClasses) {
		let listId = [];
		list.map(item => {
			if (listNameOfClasses.includes(item.nameOfClass))
				listId.push(String(item._id));
		})
		return listId
	}


	function getNameClassByClassId(list, id) {
		let nameOfClass = list.find(item => item._id == id);
		return nameOfClass ? nameOfClass.nameOfClass : "-";
	}


	return (
		<List sx={{ mb: drawerWidth / 14 + "px", mt: drawerWidth / 14 + "px" }}>
			{listClasses && <>
				<Toolbar sx={{ display: 'inline-flex', width: "90%", justifyContent: 'center' }}>
					<FormControl fullWidth>
						<InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ color: "#1976d2" }}>
							Classes list
						</InputLabel >
						<NativeSelect
							onChange={(e) => {
								setClassId(e.target.value);
								navigate("/teacher")
							}}
							defaultValue={list[0]}
						>
							{list.map((item, i) => {
								// ****** #1# d  ******
								// return <option key={i} color='primary' value={item}>{item}</option>
								return <option key={i} color='primary' value={item}>{getNameClassByClassId(listClasses, item)}</option>
							})}
						</NativeSelect>
					</FormControl>
				</Toolbar>


				<ListItem key={"list"} disablePadding onClick={() => { navigate("tableListStudent") }}>
					<ListItemButton>
						<ListItemIcon>
							<RuleOutlinedIcon color='primary' />
						</ListItemIcon>
						<ListItemText primary={"list"} />
					</ListItemButton>
				</ListItem>


				<ListItem key={"exams"} disablePadding onClick={() => { navigate("showAllExams") }}>
					<ListItemButton>
						<ListItemIcon>
							<WysiwygIcon color='primary' />
						</ListItemIcon>
						<ListItemText primary={"exams"} />
					</ListItemButton>
				</ListItem>


				<ListItem key={"overview"} disablePadding onClick={() => { navigate("overview") }}>
					<ListItemButton>
						<ListItemIcon>
							<ListAltRoundedIcon color='primary' />
						</ListItemIcon>
						<ListItemText primary={"overview"} />
					</ListItemButton>
				</ListItem>
			</>}
		</List>
	);
}


export default ListButtonOfTeacher



// let listOfExams = (
// 	<>
// 	  <ListItem sx={{backgroundColor:"gainsboro"}} disablePadding  onClick={()=>{navigate("createExam")}}>
// 	  <ListItemButton>
// 		  <ListItemIcon>
// 			  <RuleOutlinedIcon color='primary' />
// 		  </ListItemIcon>
// 		  <ListItemText primary={"create exam"} />
// 	  </ListItemButton>
// 	  </ListItem>

// 	  <ListItem sx={{backgroundColor:"gainsboro"}} disablePadding  onClick={()=>{navigate("showAllExams")}}>
// 	  <ListItemButton>
// 		  <ListItemIcon>
// 			<WysiwygIcon color='primary'/>
// 		  </ListItemIcon>
// 		  <ListItemText primary={"list exams"} />
// 	  </ListItemButton>
// 	  </ListItem>
// 	</>
//   )



// const [checkOpenListExams, setCheckOpenListExams] = useState(false);
// const openListOfExams = () => {
// 	setCheckOpenListExams(checkOpenListExams ? false: true)
// 	console.log("openListOfExams");
// };