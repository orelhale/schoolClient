import "./CreateExam.css"
import axios from "axios";

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from "../../../App"
import { NameOfClassContext } from "../Teacher"
import DateComponent from "../dateComponent/DateComponent";
import { useNavigate } from "react-router-dom";
import TebleOf_CreateExam from "../../tables/TebleOf_CreateExam";

import Style_BackButton from "../../style/Style_BackButton";
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, FormControl, InputLabel, Paper, TextField, Toolbar } from "@mui/material"
import Style_RoundButton from "../../style/Style_RoundButton"


import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Style_Button_1 from "../../style/Style_Button_1";

let CreateExam = (props)=>{
    const useContext_NameOfClassContext = useContext(NameOfClassContext);

    
	const ValueUseContext = useContext(UserContext);
    const [listStudents, setListStudents] = useState(null)
    const [nameOfExsam, setNameOfExsam] = useState("")
    const [scoreList, setScoreList] = useState(null)
    const [valueOfDate, setValueOfDate] = useState();
    let [editspecificExam, setEditSpecificExam] = useState(props.specificExam)
    let [nameOfThisClass, setNameOfThisClass] = useState(useContext_NameOfClassContext);
    let myRef = useRef();
    let navigate = useNavigate()
    
    let editDate = (date)=>{
        let newDate = date ? new Date(date) : new Date();
        newDate = newDate.toLocaleDateString('en-CA')
        return newDate
    }


// ***** למחוק אח"כ: רק בשביל הדפסה
    useEffect(()=>{
        if(listStudents && scoreList){
            console.log("listStudents = ",listStudents);
            console.log("scoreList = ",scoreList);
        }
    },[listStudents,scoreList])
    

    useEffect(()=>{
        if(nameOfThisClass && !editspecificExam){
            axios.post("http://localhost:4000/users/GetListOfStudentsInSpecificClasses", {nameOfClass: nameOfThisClass})
            .then((data)=>{
                let dataFromServer = data.data
                console.log('nameOfThisClass || editspecificExam');
                let tampDate = editDate()
                let tampDate2 = new Date(tampDate)
                setValueOfDate(editDate())
                
                let arr = []
                for (const item in dataFromServer) {
                    arr.push("")
                }
                setListStudents(dataFromServer)
                setScoreList(arr)
            })
        }
        if(nameOfThisClass && editspecificExam){
            console.log('nameOfThisClass && editspecificExam');

            setValueOfDate(editDate(editspecificExam.date))
            let dataOfClass = editspecificExam.examList
            setNameOfExsam(editspecificExam.examName)
            let arr = []
            let listName = []

            for (const item of dataOfClass) {
                arr.push(item.score)
                listName.push(item.nameStudent)
            }

            setListStudents(listName)
            setScoreList(arr)
        }
    },[nameOfThisClass,editspecificExam])
    


    const completed = ()=>{

        let dataForDatabase = []
        let averageCount = 0
        listStudents.forEach((nameStudent, i_indexScore)=> {
            let score = parseInt(scoreList[i_indexScore])
            averageCount += score ? score : 0;
            dataForDatabase.push({nameStudent: nameStudent, score: scoreList[i_indexScore]})
        });

        let reversValueOfDate = valueOfDate.split("").reverse().join("")
        let obj = {
            teacherId: ValueUseContext.dataOfUser.id,
            className: nameOfThisClass,
            examName: nameOfExsam,
            date: new Date(valueOfDate).toLocaleDateString(),
            examList: dataForDatabase,
            average: String(Math.round(averageCount / listStudents.length)),
        }
        
        console.log("obj = ",obj);
        
        axios.post("http://localhost:4000/users/addExam", obj)
            .then(
                (data)=>{
                    console.log(data);
                    navigate("../showAllExams")
                },
                (err)=>{
                alert(`Err: status = ${err.response.status}`)
                }
            )
        ;
    }

    
    return( 
        <div className="CreateExam font_CreateExam">
            {scoreList && <>
                <div style={{width: "90%"}}><Style_BackButton text={"Back to Exam list"} onClick={()=>{navigate("../showAllExams")}}/></div>

                <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                "justifyContent": 'center',
                '& > :not(style)': {
                    m: 1,
                    width: 550,
                    minHeight: 500,
                    padding: 3
                },
                }}
                >
                <Paper elevation={3} sx={{"padding": '1rem 0rem'}}>
                           
                <form className="myFlexColumnAlineCenter" onSubmit={(e)=>{e.preventDefault(); completed()}}>
                    {valueOfDate && 
                        <input required value={valueOfDate}  type={"date"} onChange={(e)=>{
                            console.log("input = ",e.target.value);
                            setValueOfDate(e.target.value)
                        }}></input>
                    }
                    <br></br>

                    <div className='myStyleOfAlineItems2'>
                        <TextField required type="String" id="standard-basic" label="Name of exam" variant="outlined" sx={{width: "9rem"}} value={nameOfExsam} onChange={(e)=>{setNameOfExsam(e.target.value)}} />
                    </div>
                    <br></br>

                    {editspecificExam && 
                        <IconButton onClick={()=>{
                            console.log("editspecificExam._id = ",editspecificExam._id);
                            axios.delete("http://localhost:4000/users/deleteExam",{params: {id: editspecificExam._id}})
                            .then(
                                (data)=>{
                                    console.log(data.data)
                                    navigate("../showAllExams")
                                },
                                (err)=>{console.log("err in deleteExam = ",err)}
                            )
                        }}><DeleteIcon color="error" /></IconButton>
                    }
            
                    
                    <TebleOf_CreateExam TableContent={{listStudents: listStudents, scoreList: scoreList}} setScoreList={setScoreList}/>
                    <div><button hidden ref={myRef} type="submit">Completed</button></div>
                    <br />
                    <Button variant="outlined" sx={{borderRadius: "0.7rem", padding: "1", height: "3rem", minWidth: "3rem", border:"1px solid"}} onClick={()=>{myRef.current.click()}}>Completed</Button>

                </form>
                </Paper></Box>
            </>}
        </div>
    )
}

export default CreateExam




      {/* <table className="table_CreateExam">
                    <tr>
                        <th className="th_style_2">Name</th>
                        <th className="th_style_2">Grade</th>
                    </tr>
                    {listStudents && listStudents.map((stusent,i)=>{
                        return (
                            <tr> 
                                <td className="td_style_2">{stusent}</td>

                                <td className="td_style_2" >
                                    <input min={0} max={100} className="input_CreateExam" type={"number"} value={scoreList[i]} onChange={(e)=>{
                                        let copyScoreList = [...scoreList]
                                        copyScoreList[i] = String(e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value)
                                        setScoreList(copyScoreList)
                                    }}></input>
                                </td>
                            </tr>
                        )
                    })}
                </table> */}