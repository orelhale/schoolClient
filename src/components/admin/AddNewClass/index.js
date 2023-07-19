
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import GenericTable from '../../tables/GenericTable';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../../context/DataContext';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import styles from './style.module.css';
import globalElement from '../../../globalStyle/globalElement.module.css';
import boxElement from '../../../globalStyle/boxElement.module.css';
import MyIcon_Edit from '../../myIcons/MyIcon_Edit';


export default function AddNewClass({ setRows, classToEdit, setClassToEdit, updateEditClass }) {

	let { userData } = useContext(DataContext)

	let [nameOfClass, setNameOfClass] = useState("")
	let [studentsList, setStudentsList] = useState([])

	let [identifyOfStudent, setIdentifyOfStudent] = useState("")
	let [nameOfStudent, setNameOfStudent] = useState("")

	let [errorMessage, setErrorMessage] = useState("")
	let [columns, setColumns] = useState([])
	let navigate = useNavigate()

	let [dataToServer, setDataToServer] = useState(null)
	let [editStudent, setEditStudent] = useState(-1)
	const styleAllHeaders = { fontWeight: 750, alignItems: "left", backgroundColor: "#1976d2", color: "#FFF" };
	let styleCenter = { "display": 'flex', "justifyContent": 'center', "flexDirection": "column", "alignItems": "center", }

	let [inputList, setInputList] = useState([
		{ name: "nameStudent", placeholder: "First name", type: "text", style: {} },
		{ name: "family", placeholder: "Last name", type: "text", style: {} },
		// {name:"fatherName", placeholder:"Father name", type:"text",style:{}},
		// {name:"motherName", placeholder:"Mother name", type:"text",style:{}},
		{ name: "haddress", placeholder: "Haddress", type: "text", style: {} },
		{ name: "identify", placeholder: "identify", type: "number", style: {} },
		{ name: "phone", placeholder: "Phone", type: "text", style: {}, pattern: "[0-9]{1,10}" },
	])

	useEffect(() => {
		initValueFromInput()

		let listCloumn = inputList.map(({ name, placeholder }) => ({
			id: name,
			label: placeholder,
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		}))

		listCloumn.push({
			id: '_id',
			label: 'icon',
			styleColumn: { minWidth: 10 },
			styleRow: { minWidth: 10, padding: "16px 5px" }
		})
		listCloumn.splice(0, 0, {
			id: '#',
			label: '#',
			styleColumn: { minWidth: 10, padding: "16px" },
			styleRow: { minWidth: 10, padding: "16px" }
		})

		setColumns(listCloumn)

		return () => { setClassToEdit(null) }
	}, [])

	useEffect(() => {
		console.log("studentsList== ", studentsList);
	}, [studentsList])

	useEffect(() => {
		if (classToEdit) {
			// console.log("classToEdit == ",classToEdit);
			setStudentsList(classToEdit.listStudents)
			setNameOfClass(classToEdit.nameOfClass)
		}
	}, [classToEdit])


	function setValueFromInput(event) {
		setDataToServer(e => ({ ...e, [event.target.name]: event.target.value }))
	}

	function setEditStudentFunc({ data, index }) {
		console.log("obj == ", data);
		setEditStudent(index)
		setDataToServer(data)
	}

	function initValueFromInput() {
		let obj = {}
		inputList.forEach(({ name }) => obj[name] = "");
		setDataToServer(obj)
	}

	function funcRemoveItem(index) {
		let copyArr = [...studentsList]
		copyArr.splice(index, 1)
		setStudentsList(copyArr)
	}

	function checkValueFromInput() {
		if (!dataToServer)
			return false
		let copyInputList = { ...inputList }
		let check = true
		copyInputList.forEach((item) => {
			if (dataToServer[item.name] == "") {
				item.style = { border: "red 1px solid" }
				check = false
			}
		});
		return check
	}

	let funcAddNewStudent = () => {
		let copyArr = [...studentsList]

		if (copyArr.length > 0) {
			for (const item of copyArr) {
				if (item.identify == identifyOfStudent) {
					setErrorMessage("This identify is aldeady exist")
					return;
				}
			}
		}

		console.log("editStudent  =", editStudent);
		setErrorMessage("")
		if (editStudent < 0) {
			copyArr.push({
				...dataToServer,
				schoolName: userData.nameSchool,
			})
			console.log("copyArr = ", copyArr);
		} else {
			copyArr[editStudent] = dataToServer
			setEditStudent(-1)
		}
		setStudentsList(copyArr)
		setIdentifyOfStudent("")
		setNameOfStudent("")
		initValueFromInput()
	}

	function setNewDataToEditClass() {
		let obj = { ...classToEdit, nameOfClass: nameOfClass, listStudents: studentsList.map(stu => { stu.nameOfClass = nameOfClass; return stu }) }
		console.log("obj == ", obj);
		updateEditClass(obj)
		// setClassToEdit()
	}

	let finishedConfigureClass = () => {
		if (classToEdit) {
			setNewDataToEditClass()
			return
		}

		let copyListOfClass = studentsList.map((student) => {
			student.nameOfClass = nameOfClass
			return student
		})

		let dataToServer = {
			nameOfClass: nameOfClass,
			listStudents: copyListOfClass,
			nameOfSchool: userData.nameSchool
		}
		console.log("++ === dataToServer = ", dataToServer);
		axios.post("http://localhost:4000/admin/addNewClass", dataToServer)
			.then(
				(data) => {
					let dataFromServer = data.data;
					console.log("dataFromServer = ", dataFromServer);
					// שינוי שם מפתח 
					// let newDataFromServer = {}
					// for (const item in dataFromServer) {
					//     if(item == "_id"){
					//     newDataFromServer.id = dataFromServer[item]
					//     }else{
					//     newDataFromServer[item] = dataFromServer[item]
					//     }
					// }
					// הוספת הכיתה החדשה למערך הכיתות שכבר קיבלתי מהשרת
					setRows((rows) => {
						let copyArr = [...rows]
						dataFromServer.numberOfStudents = dataFromServer.listStudents.length
						copyArr.push(dataFromServer)
						return copyArr
					})
					navigate("../")
				},
				(err) => {
					console.log("Err from server = ", err.response.data);
				}
			)
	}


	return (
		<div style={styleCenter}>
			<form onSubmit={(e) => {
				e.preventDefault()
				funcAddNewStudent()
			}
			} style={styleCenter}>

				{dataToServer &&
					<div className={`${boxElement.flex_dir_column} ${boxElement.flex_gap}`}>
						{inputList.map(({ name, placeholder, type, style, pattern }) => <input className={`${globalElement.input}`} pattern={pattern} required type={type} name={name} placeholder={placeholder} value={dataToServer[name]} onChange={setValueFromInput} style={style} />)}
					</div>
				}
				<br />
				<div className={styles.myStyleOfAlineItems1}>
					{/* <TextField required type={"text"} label="Name student" variant="outlined" sx={{ width: "8rem" }} value={nameOfStudent} onChange={(e) => { setNameOfStudent(e.target.value) }} />
                                <TextField required type={"number"} label="Identify" variant="outlined" sx={{ width: "8rem" }} value={identifyOfStudent} onChange={(e) => { setIdentifyOfStudent(e.target.value) }} /> */}
					<Button variant="outlined" type='submit' sx={{ borderRadius: "100%", padding: "0", height: "3rem", minWidth: "3rem" }}> {editStudent >= 0 ? <MyIcon_Edit color="primary" /> : <PersonAddAlt1Icon />} </Button>
				</div>
				<br />

			</form>

			<form onSubmit={(e) => { e.preventDefault(); finishedConfigureClass() }}>
				<div style={styleCenter}>

					<div className={styles.myStyleOfAlineItems2}>
						<TextField required id="standard-basic" label="Class name" variant="standard" sx={{ width: "6rem" }} value={nameOfClass} onChange={(e) => { setNameOfClass(e.target.value) }} />
					</div>
					<br />
					<GenericTable
						columns={columns}
						dataRows={studentsList}
						styleAllHeaders={styleAllHeaders}
						icons={(row, value, index) => {
							return <>
								<IconButton onClick={() => { funcRemoveItem(index) }}><DeleteIcon color="error" /></IconButton>
								{/* <MyIcon_Edit2 onClick={() => { handleEdit(row._id, index) }} /> */}
								{/* <span style={{ marginRight: "20px" }} /> */}
								<IconButton type='button' onClick={() => { setEditStudentFunc({ data: row, index: index }) }}><CreateIcon /></IconButton>
								{/* <MyIcon_Delete onClick={() => { handleDelete(row._id, index) }} /> */}
							</>
						}}
					/>
					{/* <TableCell key={index_row + "d"}> </TableCell>
                     <TableCell key={index_row + "d2"}> <button type='button' onClick={()=>{editStudent({data:studentsList.find(stu=>stu.identify == row.identify), index: studentsList.findIndex(stu=>stu.identify == row.identify)})}}>edit</button> </TableCell> */}
					<br />
					<br />
					<div style={{ width: "80%" }}>
						{errorMessage && <div className={styles.errorMasage2}>{errorMessage && <span className={styles._errorMasage2}>* </span>}{errorMessage}</div>}
					</div>
					<br />
					<Button variant="outlined" type='submit'>{classToEdit ? <EditIcon /> : "save"}</Button>
					<br />
				</div>
			</form>
		</div>
	);
}