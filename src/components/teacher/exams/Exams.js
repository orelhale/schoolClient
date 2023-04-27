import "./Exams.css"
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CreateExam from "../createExam/CreateExam";
import ShowAllExams from "../showAllExams/ShowAllExams";

let Exams = (props)=>{
    const location = useLocation()
	let navigate = useNavigate()



    
    return(
        <div className="Exams">
            <>

                <br></br>
                <button onClick={()=>{navigate("showAllExams")}}>showAllExams</button>
                <button onClick={()=>{navigate("create exam")}}>create exam</button>

                <Routes>
                    <Route index element={<h1>exams</h1>}></Route>

                    <Route path='*' element={location.pathname != "/teacher/exams" && <h1>exams *********</h1>} />
                </Routes>
            </>
        </div>
    )
}

export default Exams