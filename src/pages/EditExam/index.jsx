
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material"
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DataContext from "../../context/DataContext";
import TebleOf_CreateExam from "../../components/tables/TebleOf_CreateExam";
import SmallContainer from "../../components/SmallContainer";
import Style_BackButton from "../../components/style/Style_BackButton";
import apiFunction from '../../functions/apiFunction';



export default function EditExam() {
   let { classId, examDate, setExamDate, userData } = useContext(DataContext)
   let [listStudents, setListStudents] = useState(null)
   let [nameOfExsam, setNameOfExsam] = useState("")
   let [scoreList, setScoreList] = useState(null)
   let [valueOfDate, setValueOfDate] = useState();
   let [nameOfThisClass, setNameOfThisClass] = useState(classId);
   let myRef = useRef();
   let navigate = useNavigate()


   let editDate = (date) => {
      let newDate = date ? new Date(date) : new Date();
      newDate = newDate.toLocaleDateString('en-CA')
      return newDate
   }

   useEffect(() => {
      if (!examDate || !nameOfThisClass) {
         navigate("../showAllExams")
      }
   })

   useEffect(() => {
      if (nameOfThisClass && examDate) {

         setValueOfDate(editDate(examDate.date))
         let dataOfClass = examDate.examList
         setNameOfExsam(examDate.examName)
         let arr = []
         let listName = []

         for (const item of dataOfClass) {
            arr.push(item.score)
            listName.push(item.nameStudent)
         }

         setListStudents(listName)
         setScoreList(arr)
      }
   }, [nameOfThisClass, examDate])



   const completed = () => {

      let dataForDatabase = []
      let averageCount = 0
      listStudents.forEach((nameStudent, i_indexScore) => {
         let score = parseInt(scoreList[i_indexScore])
         averageCount += score ? score : 0;
         dataForDatabase.push({ nameStudent: nameStudent, score: scoreList[i_indexScore] })
      });


      let obj = {
         teacherId: userData.id,
         className: nameOfThisClass,
         examName: nameOfExsam,
         date: new Date(valueOfDate).toLocaleDateString(),
         examList: dataForDatabase,
         average: String(Math.round(averageCount / listStudents.length)),
         id: examDate._id,
      }

      console.log("data to server = ", obj);
      apiFunction(`exams`, "PUT", obj, (data) => {
         setExamDate(null)
         navigate("../showAllExams")
      },
         (err) => alert(`Err: status = ${err.response.status}`)
      )

   }


   return (
      <div className="CreateExam font_CreateExam">
         <div style={{ width: "90%" }}><Style_BackButton text={"Back to Exam list"} onClick={() => { navigate("../showAllExams") }} /></div>

         {scoreList &&
            <SmallContainer>
               <form className="myFlexColumnAlineCenter" onSubmit={(e) => { e.preventDefault(); completed() }}>
                  {valueOfDate &&
                     <input required value={valueOfDate} type={"date"} onChange={(e) => {
                        console.log("input = ", e.target.value);
                        setValueOfDate(e.target.value)
                     }}></input>
                  }
                  <br></br>

                  <div className='myStyleOfAlineItems2'>
                     <TextField required type="String" id="standard-basic" label="Name of exam" variant="outlined" sx={{ width: "9rem" }} value={nameOfExsam} onChange={(e) => { setNameOfExsam(e.target.value) }} />
                  </div>
                  <br></br>

                  <IconButton onClick={() => {
                     console.log("examDate._id = ", examDate._id);
                     apiFunction("exams", "DELETE", { id: examDate._id })
                        .then(
                           (data) => {
                              navigate("../showAllExams")
                           },
                           (err) => { console.log("err in deleteExam = ", err) }
                        )
                  }}><DeleteIcon color="error" /></IconButton>

                  <TebleOf_CreateExam TableContent={{ listStudents: listStudents, scoreList: scoreList }} setScoreList={setScoreList} />
                  <div><button hidden ref={myRef} type="submit">Completed</button></div>
                  <br />
                  <Button variant="outlined" sx={{ borderRadius: "0.7rem", padding: "1", height: "3rem", minWidth: "3rem", border: "1px solid" }} onClick={() => { myRef.current.click() }}>Completed</Button>

               </form>
            </SmallContainer>
         }
      </div>
   )
}
