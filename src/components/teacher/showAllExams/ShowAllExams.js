import { useEffect, useState, useContext } from "react"
import "./ShowAllExams.css"

import { UserContext } from "../../../App"
import axios from "axios"
import CreateExam from "../createExam/CreateExam"
import { NameOfClassContext } from "../Teacher"
import TebleOfListExams from "../../tables/TebleOf_ListExams"
import { useNavigate } from "react-router-dom"


import Style_ButtonAdd from "../../style/Style_ButtonAdd"


let ShowAllExams = (props)=>{
	const useContext_NameOfClassContext = useContext(NameOfClassContext);
	const ValueUseContext = useContext(UserContext);

	const [dataAboutUser, setdataAboutUser] = useState(ValueUseContext.dataOfUser)
	const [nameOfThisClass, setNameOfThisClass] = useState(useContext_NameOfClassContext);

	let [AllExams, setAllExams] = useState(null)
	let [notData, setNotData] = useState(null)
	let [specificExam, setSpecificExam] = useState(null)

	let navigate = useNavigate()


	useEffect(()=>{
		 if(nameOfThisClass){
			  props.setSpecificExam(null)
		 }
	},[])



	useEffect(()=>{
		 if(dataAboutUser){

			let dataToServer = {
				teacherId: dataAboutUser.id,
				className: nameOfThisClass
			}

			// console.log("dataToServer = ",dataToServer);
			axios.post("http://localhost:4000/users/getAllExamsFromOneTeacher", dataToServer)
			.then(
				(data)=>{
					let dataFromServer = data.data

					if(!dataFromServer[0]){
						setNotData("You don't have any tests yet")
					}else{
						setAllExams(dataFromServer)
					}
				},
				(err)=>{alert("err")}
			)
		 }
	},[])



	return (
		<div className=" myFlexColumnAlineCenter">
			{notData && <h1>{notData}</h1>}
			<Style_ButtonAdd text={"Add exam"} onClick={()=>{props.setSpecificExam(null); navigate("/teacher/createExam")}}/>
			{AllExams && 
				<>
					<br></br>
					<br></br>
					<TebleOfListExams AllExams={AllExams} setSpecificExam={props.setSpecificExam} setNotData={setNotData} specificExam={specificExam}/>
				</>
			} 

			{/* {specificExam && checkShow &&
				<CreateExam specificExam={specificExam} setCheckShow={setCheckShow} />
			} */}
		</div>
	)
}


export default ShowAllExams

// let table = (
// 	<table className="table_style_1">
// 	<tr>
// 		<th className="td_style_3">#</th>
// 		<th className="th_style_2">Name</th>
// 		<th className="th_style_2">Date</th>
// 	</tr>
// 	{AllExams.map((exam, i)=>{
// 		return (
// 			<tr onClick={()=>{
// 				exam.examList[0] ? setSpecificExam(exam) : setNotData("this exam is empty");
// 			}}>
// 				<td className="td_style_3">{i + 1}.</td>
// 				<td className="td_style_2">{exam.examName}</td>
// 				<td className="td_style_2">{exam.date}</td>
// 			</tr>
// 		)
// 	})}
// 	</table> 
// )