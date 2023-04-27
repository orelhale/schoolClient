
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TebleOf_AddingClassOrEditingClass from '../tables/TebleOf_AddingClassOrEditingClass';
import { UserContext } from "../../App"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function EditingClass(props) {
    const ValueUseContext = useContext(UserContext);

    let [nameOfClass, setNameOfClass] = useState("")
    let [studentsList, setStudentsList] = useState([])

    let [identifyOfStudent , setIdentifyOfStudent] = useState("")
    let [nameOfStudent, setNameOfStudent] = useState("")

    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    // useEffect(()=>{
    //     return ()=>{
    //         props.setClassToEdit(null)
    //     }
    // },[])


    useEffect(()=>{
        if(props.classToEdit){
            console.log("classToEdit = ",props.classToEdit);
            let obj = props.classToEdit
            console.log("props.classToEdit = ",props.classToEdit);
            setStudentsList(obj.listStudents)
            setNameOfClass(obj.nameOfClass)
        }
    },[props.classToEdit])


    // TODO ****
    // formContentOfEditingClass להכניס את העיצוב הזה לתוך קובץ עיצוב ושם העיצוב יהיה 
    let styleCenter = {
        "display": 'flex',
        "justifyContent": 'center',
        "flexDirection": "column",
        "alignItems": "center",
    }

    let funcAddStudent = ()=>{
        let copyArr = [...studentsList]
        if(copyArr.length > 0){
            console.log("ddd");
            for (const item of copyArr) {
                if(item.identify == identifyOfStudent){
                    setErrorMessage("This identify is aldeady exist")
                    return;
                }
            }
        }
        setErrorMessage("")

        copyArr.push({
            nameStudent: nameOfStudent,
            identify: identifyOfStudent,
            schoolName: ValueUseContext.dataOfUser.nameSchool,
        })

        console.log("copyArr = ",copyArr);
        setIdentifyOfStudent("")
        setNameOfStudent("")
        setStudentsList(copyArr)
    }


    let sendDataToServer =()=>{
        let copyListOfClass = studentsList.map((student)=>{
            student.nameOfClass = nameOfClass
            return student
        })
        let dataToServer = {
            nameOfClass: nameOfClass,
            // listStudents: copyListOfClass,
            listStudents: studentsList,
            nameOfSchool: ValueUseContext.dataOfUser.nameSchool,
            _id: props.classToEdit._id
        }
        console.log("dataToServer = ",dataToServer);
        axios.put("http://localhost:4000/admin/editClass",dataToServer)
        .then(
            (data)=>{
                let dataFromServer = data.data;
                console.log("dataFromServer = ",dataFromServer);
                // צריך לעדכן ברשימת הכיתות את הכיתה שהתעדכנה
                dataFromServer.numberOfStudents = dataFromServer.listStudents.length
                props.setRows((e)=>{
                    let copyListClass = [...e];
                    let index = copyListClass.findIndex(item => item._id == props.classToEdit._id);
                    copyListClass.splice(index,1,dataFromServer);
                    
                    console.log("copyListClass = ",copyListClass);
                    return  copyListClass
                })
                navigate("../")
                props.setClassToEdit(null);
            },
            (err)=>{
                console.log("Err from server = ",err.response.data);
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
            <form onSubmit={(e)=>{e.preventDefault(); funcAddStudent()}}>
                <div style={styleCenter}>

                    <br />
                    <div className='myStyleOfAlineItems2'>
                        <TextField required id="standard-basic" label="Class name" variant="standard" sx={{width: "6rem"}} value={nameOfClass} onChange={(e)=>{setNameOfClass(e.target.value)}} />
                    </div>
                    <br />
                    <TebleOf_AddingClassOrEditingClass studentsList={studentsList} setStudentsList={setStudentsList} />
                    <br />
                    <br />
                    <br />
                    <div className='myStyleOfAlineItems1'>
                        <TextField required type={"text"} label="Name student" variant="outlined" sx={{width: "8rem"}} value={nameOfStudent} onChange={(e)=>{setNameOfStudent(e.target.value)}}/>
                        <TextField required type={"number"} label="Identify" variant="outlined" sx={{width: "8rem"}} value={identifyOfStudent} onChange={(e)=>{setIdentifyOfStudent(e.target.value)}} />
                        <Button  variant="outlined" type='submit' sx={{borderRadius: "100%",padding: "0", height: "3rem", minWidth: "3rem"}}> <PersonAddAlt1Icon /></Button>
                    </div>
                    <br />
                    <div style={{width: "80%"}}>
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