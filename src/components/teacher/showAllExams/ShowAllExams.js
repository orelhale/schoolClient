import { useEffect, useState, useContext } from "react"
import "./ShowAllExams.css"

import TebleOfListExams from "../../tables/TebleOf_ListExams"
import { useNavigate } from "react-router-dom"
import Style_ButtonAdd from "../../style/Style_ButtonAdd"
import DataContext from "../../../context/DataContext"
import { funcApi_GET2_Exams, funcApi_DELETE_Exams } from "../../../functions/apiFunctionExams"


function ShowAllExams() {

	let { setExamDate, classId, userData } = useContext(DataContext)


	const [nameOfThisClass, setNameOfThisClass] = useState(classId);

	let [AllExams, setAllExams] = useState(null)
	let [notData, setNotData] = useState(null)

	let navigate = useNavigate()


	let handleEditExam = (data) => {
		setExamDate(data)
		navigate("/teacher/editExam")
	}
	// פונקציית מחיקת מיבחן
	let handleDeleteExam = (id, index_row) => {
		console.log("id = ", id);
		// שרת: מחיקת מבחן 
		funcApi_DELETE_Exams({ id: id }, () => {
			let tempData = [...AllExams]
			tempData.splice(index_row, 1)
			setAllExams(tempData)
		})
	}

	useEffect(() => {
		if (userData) {
			let dataToServer = {
				teacherId: userData.id,
				className: nameOfThisClass
			}

			// שרת: בקשת המבחנים של לפי מזהה מורה ומזהה כיתה
			funcApi_GET2_Exams(
				dataToServer,
				(dataFromServer) => {
					if (!dataFromServer[0])
						return setNotData("You don't have any tests yet")
					setAllExams(dataFromServer)
				}
			)
		}
	}, [])


	return (
		<div className="myFlexColumnAlineCenter">
			{notData && <h1>{notData}</h1>}
			<Style_ButtonAdd text={"Add exam"} onClick={() => navigate("/teacher/createExam")} />
			{AllExams && AllExams[0] &&
				<>
					<br></br>
					<br></br>
					<TebleOfListExams AllExams={AllExams} handleEditExam={handleEditExam} setNotData={setNotData} handleDeleteExam={handleDeleteExam} />
				</>
			}
		</div>
	)
}

export default ShowAllExams