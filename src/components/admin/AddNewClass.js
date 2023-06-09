
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TebleOf_AddingClassOrEditingClass from '../tables/TebleOf_AddingClassOrEditingClass';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';

export default function AddNewClass(props) {

    let { userData } = useContext(DataContext)

    let [nameOfClass, setNameOfClass] = useState("")
    let [studentsList, setStudentsList] = useState([])

    let [identifyOfStudent, setIdentifyOfStudent] = useState("")
    let [nameOfStudent, setNameOfStudent] = useState("")

    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()


    let styleCenter = {
        "display": 'flex',
        "justifyContent": 'center',
        "flexDirection": "column",
        "alignItems": "center",
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
            listStudents: copyListOfClass,
            nameOfSchool: userData.nameSchool
        }
        console.log("dataToServer = ", dataToServer);
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
                    props.setRows((rows) => {
                        let copyArr = [...rows]
                        dataFromServer.numberOfStudents = dataFromServer.listStudents.length
                        rows.push(dataFromServer)
                        return rows
                    })
                    navigate("../")
                },
                (err) => {
                    console.log("Err from server = ", err.response.data);
                }
            )
    }


    return (
        <>
            <Box
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
                <Paper elevation={3}>
                    <form onSubmit={(e) => { e.preventDefault(); funcAddStudent() }}>
                        <div style={styleCenter}>

                            <br />
                            <div className='myStyleOfAlineItems2'>
                                <TextField required id="standard-basic" label="Class name" variant="standard" sx={{ width: "6rem" }} value={nameOfClass} onChange={(e) => { setNameOfClass(e.target.value) }} />
                            </div>
                            <br />
                            <TebleOf_AddingClassOrEditingClass studentsList={studentsList} setStudentsList={setStudentsList} />
                            <br />
                            <br />
                            <br />
                            <div className='myStyleOfAlineItems1'>
                                <TextField required type={"text"} label="Name student" variant="outlined" sx={{ width: "8rem" }} value={nameOfStudent} onChange={(e) => { setNameOfStudent(e.target.value) }} />
                                <TextField required type={"number"} label="Identify" variant="outlined" sx={{ width: "8rem" }} value={identifyOfStudent} onChange={(e) => { setIdentifyOfStudent(e.target.value) }} />
                                <Button variant="outlined" type='submit' sx={{ borderRadius: "100%", padding: "0", height: "3rem", minWidth: "3rem" }}> <PersonAddAlt1Icon /></Button>
                            </div>
                            <br />
                            <div style={{ width: "80%" }}>
                                {errorMessage && <div className="errorMasage2">{errorMessage && <span className="_errorMasage2">* </span>}{errorMessage}</div>}
                            </div>
                            <br />
                            <Button variant="outlined" onClick={sendDataToServer}>save</Button>
                            <br />
                        </div>
                    </form>
                </Paper>
            </Box>
        </>
    );
}