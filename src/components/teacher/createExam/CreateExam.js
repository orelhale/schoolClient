import "./CreateExam.css"
import axios from "axios";
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TebleOf_CreateExam from "../../tables/TebleOf_CreateExam";
import { Button, TextField } from "@mui/material"
import apiFunction from "../../../functions/apiFunction";
import SmallContainer from "../../SmallContainer";
import DataContext from "../../../context/DataContext";
import Style_BackButton from "../../buttons/Style_BackButton";
import DateComponent from "../dateComponent/DateComponent";



export default function CreateExam() {

	let { classId, userData } = useContext(DataContext)

	let [listStudents, setListStudents] = useState(null)
	let [listStudentsWithId, setListStudentsWithId] = useState(null)
	let [nameOfExsam, setNameOfExsam] = useState("")
	let [scoreList, setScoreList] = useState(null)
	let [valueOfDate, setValueOfDate] = useState(new Date());
	let [nameOfThisClass, setNameOfThisClass] = useState(classId);
	let myRef = useRef();
	let navigate = useNavigate()

	let editDate = (date) => {
		let newDate = date ? new Date(date) : new Date();
		newDate = newDate.toLocaleDateString('en-CA')
		return newDate
	}


	useEffect(() => {
		axios.post("http://localhost:4000/users/GetListOfStudentsInSpecificClassesWithId", { nameOfClass: nameOfThisClass })
			.then((data) => {
				let ServerData = data.data
				console.log("ServerData ==== ", ServerData);
				setListStudentsWithId(ServerData)

				let dataFromServer = ServerData.map(stu => stu.nameStudent)
				console.log("dataFromServer ==== ", dataFromServer);

				console.log('nameOfThisClass || editspecificExam');
				// setValueOfDate(editDate())
				let arr = []
				for (const item in dataFromServer) {
					arr.push("")
				}
				setListStudents(dataFromServer)
				setScoreList(arr)
			})

	}, [nameOfThisClass])

	const handleChange = (newValue) => {
		// setDataTable(null)
		setValueOfDate(newValue);
	};


	const completed = () => {

		let dataForDatabase = []
		let averageCount = 0
		listStudentsWithId.forEach(({ nameStudent, _id }, i_indexScore) => {
			let score = parseInt(scoreList[i_indexScore])
			averageCount += score ? score : 0;
			dataForDatabase.push({ nameStudent: nameStudent, id: _id, score: scoreList[i_indexScore] })
			// dataForDatabase.push({ nameStudent: nameStudent,id: _id, score: Number(scoreList[i_indexScore]) })
		});

		// let reversValueOfDate = valueOfDate.split("").reverse().join("")
		let obj = {
			teacherId: userData.id,
			className: nameOfThisClass,
			examName: nameOfExsam,
			date: new Date(valueOfDate).toLocaleDateString(),
			examList: dataForDatabase,
			average: String(Math.round(averageCount / listStudents.length)),
		}

		console.log("addExam = ", obj);
		apiFunction(`exams`, "POST", obj, (data) => {
			// console.log(data);
			navigate("../showAllExams")
		},
			(err) => alert(`Err: status = ${err.response.status}`)
		)

	}


	return (
		<div className="CreateExam font_CreateExam">
			{scoreList && <>
				<div style={{ width: "90%" }}><Style_BackButton text={"Back to Exam list"} onClick={() => { navigate("../showAllExams") }} /></div>
				<br></br>

				<SmallContainer>
					<form className="myFlexColumnAlineCenter" onSubmit={(e) => { e.preventDefault(); completed() }}>
						{/* {valueOfDate &&
							<input required value={valueOfDate} type={"date"} onChange={(e) => {
								console.log("input = ", e.target.value);
								setValueOfDate(e.target.value)
							}}></input>
						} */}
						<DateComponent value={valueOfDate} handleChange={handleChange} setValue={setValueOfDate} />

						<br></br>

						<div className='myStyleOfAlineItems2'>
							<TextField required type="String" id="standard-basic" label="Name of exam" variant="outlined" sx={{ width: "9rem" }} value={nameOfExsam} onChange={(e) => { setNameOfExsam(e.target.value) }} />
						</div>
						<br></br>

						<TebleOf_CreateExam TableContent={{ listStudents: listStudents, scoreList: scoreList }} setScoreList={setScoreList} />
						<div><button hidden ref={myRef} type="submit">Completed</button></div>
						<br />
						<Button variant="outlined" sx={{ borderRadius: "0.7rem", padding: "1", height: "3rem", minWidth: "3rem", border: "1px solid" }} onClick={() => { myRef.current.click() }}>Completed</Button>

					</form>
				</SmallContainer>

			</>}
		</div>
	)
}

