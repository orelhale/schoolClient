
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TebleOf_AddingClassOrEditingClass from '../tables/TebleOf_AddingClassOrEditingClass';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import GenericTable from '../tables/GenericTable';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

export default function EditingClass(props) {
    let { userData } = useContext(DataContext)

    let [nameOfClass, setNameOfClass] = useState("")
    let [studentsList, setStudentsList] = useState([])

    let [identifyOfStudent, setIdentifyOfStudent] = useState("")
    let [nameOfStudent, setNameOfStudent] = useState("")

    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
    let [dataToServer, setDataToServer] = useState(null)
    let [columns, setColumns] = useState([])
    const styleAllHeaders = { fontWeight: 750, alignItems: "left", backgroundColor: "#1976d2", color: "#FFF" };
    let [editStudent, setEditStudent] = useState(-1)

    // useEffect(()=>{
    //     return ()=>{
    //         props.setClassToEdit(null)
    //     }
    // },[])

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

    }, [])

    useEffect(() => {
        if (props.classToEdit) {
            console.log("classToEdit = ", props.classToEdit);
            let obj = props.classToEdit
            console.log("props.classToEdit = ", props.classToEdit);
            setStudentsList(obj.listStudents)
            setNameOfClass(obj.nameOfClass)
        }
    }, [props.classToEdit])




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

 
    // TODO ****
    // formContentOfEditingClass להכניס את העיצוב הזה לתוך קובץ עיצוב ושם העיצוב יהיה 
    let styleCenter = {
        "display": 'flex',
        "justifyContent": 'center',
        "flexDirection": "column",
        "alignItems": "center",
    }

    function setEditStudentFunc({ data, index }) {
        console.log("obj == ", data);
        setEditStudent(index)
        setDataToServer(data)
    }

    let funcAddStudent = () => {
        let copyArr = [...studentsList]
        if (copyArr.length > 0) {
            console.log("ddd");
            for (const item of copyArr) {
                if (item.identify == identifyOfStudent) {
                    setErrorMessage("This identify is aldeady exist")
                    return;
                }
            }
        }
        setErrorMessage("")

        copyArr.push({
            nameStudent: nameOfStudent,
            identify: identifyOfStudent,
            schoolName: userData.nameSchool,
        })

        console.log("copyArr = ", copyArr);
        setIdentifyOfStudent("")
        setNameOfStudent("")
        setStudentsList(copyArr)
    }


    let sendDataToServer = () => {
        let copyListOfClass = studentsList.map((student) => {
            student.nameOfClass = nameOfClass
            return student
        })
        let dataToServer = {
            nameOfClass: nameOfClass,
            // listStudents: copyListOfClass,
            listStudents: studentsList,
            nameOfSchool: userData.nameSchool,
            _id: props.classToEdit._id
        }
        console.log("dataToServer == ", dataToServer);
        console.log("dataToServer = ", dataToServer);
        axios.put("http://localhost:4000/admin/editClass", dataToServer)
            .then(
                (data) => {
                    let dataFromServer = data.data;
                    console.log("dataFromServer = ", dataFromServer);
                    // צריך לעדכן ברשימת הכיתות את הכיתה שהתעדכנה
                    dataFromServer.numberOfStudents = dataFromServer.listStudents.length
                    props.setRows((e) => {
                        let copyListClass = [...e];
                        let index = copyListClass.findIndex(item => item._id == props.classToEdit._id);
                        copyListClass.splice(index, 1, dataFromServer);

                        console.log("copyListClass = ", copyListClass);
                        return copyListClass
                    })
                    navigate("../")
                    props.setClassToEdit(null);
                },
                (err) => {
                    console.log("Err from server = ", err.response.data);
                }
            )
    }
    function setValueFromInput(event) {
        setDataToServer(e => ({ ...e, [event.target.name]: event.target.value }))
    }

    return (
        <>
            {/* <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    "justifyContent": 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 450,
                        minHeight: 500,
                    },
                }}
            >
                <Paper elevation={3}> */}
            <form onSubmit={(e) => { e.preventDefault(); funcAddStudent() }}>
                <div style={styleCenter}>
                    {dataToServer &&
                        <div style={{ display: "flex", flexDirection: "row" }}>
                        {inputList.map(({ name, placeholder, type, style, pattern }) => <input pattern={pattern} required type={type} name={name} placeholder={placeholder} value={dataToServer[name]} onChange={setValueFromInput} style={style} />)}
                    </div>
                    }
                    <br />
                    <div className='myStyleOfAlineItems2'>
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
                    {/* <TebleOf_AddingClassOrEditingClass studentsList={studentsList} setStudentsList={setStudentsList} /> */}
                    {/* <br />
                    <br />
                    <br />
                     <div className='myStyleOfAlineItems1'>
                        <TextField required type={"text"} label="Name student" variant="outlined" sx={{ width: "8rem" }} value={nameOfStudent} onChange={(e) => { setNameOfStudent(e.target.value) }} />
                        <TextField required type={"number"} label="Identify" variant="outlined" sx={{ width: "8rem" }} value={identifyOfStudent} onChange={(e) => { setIdentifyOfStudent(e.target.value) }} />
                        <Button variant="outlined" type='submit' sx={{ borderRadius: "100%", padding: "0", height: "3rem", minWidth: "3rem" }}> <PersonAddAlt1Icon /></Button>
                    </div> */}
                    <br />
                    <div style={{ width: "80%" }}>
                        {errorMessage && <div className="errorMasage2">{errorMessage && <span className="_errorMasage2">* </span>}{errorMessage}</div>}
                    </div>
                    <br />
                    <Button variant="outlined" onClick={sendDataToServer}>save</Button>
                    <br />
                </div>
            </form>
            {/* </Paper>
            </Box> */}
        </>
    );
}