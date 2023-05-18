import './Teacher.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import TableListStudent from "./tableListStudent/TableListStudent"
import { useContext, useEffect, useState } from 'react';
import { checkToken } from '../functionManager';
import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import ListButtonOfTeacher from './ListButtonOfTeacher';
import ShowAllExams from './showAllExams/ShowAllExams';
import CreateExam from './createExam/CreateExam';
import EditExam from '../../pages/EditExam';
import DataContext from '../../context/DataContext';


function Teacher() {
	let navigate = useNavigate()
	let location = useLocation()
	let { classId, setClassId, setUserData, userData } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("teacher")
		if (!dataFromCheckToken) {
			navigate("/login")
		}

		// console.log("dataFromCheckToken = ",dataFromCheckToken);
		// console.log("dataFromCheckToken = ",dataFromCheckToken.class_permission[0]);
		// setClassId(dataFromCheckToken.class_permission[0]? dataFromCheckToken.class_permission[0] : "-")

		setClassId(dataFromCheckToken.class_permission[0] ? dataFromCheckToken.class_permission[0] : "-")
		// console.log(dataFromCheckToken.class_permission[0]);
		setUserData(dataFromCheckToken)
	}


	useEffect(() => {
		if (userData, classId) {
			// console.log("Teacher: data About User = ",userData)
			// console.log("classId = ",classId)
			setChecksIfShowComponent(true)
		}
	}, [userData, classId])


	useEffect(() => {
		if (location.pathname == "/teacher") {
			setClassId(null)
		}
		if (!classId) {
			if (location.pathname == "/teacher/tableListStudent") {
				navigate("")
				setClassId(null)
			}
		}
		funcCheckToken()
	}, [])



	// ****TODO לעשות אותה פונקציה גלובלית
	function logOut() {
		navigate("/login");
		localStorage.removeItem("className")
		localStorage.removeItem("tokenOfUser")
	}

	return (

		<>
			{checksIfShowComponent &&
				// <StyleFor_RegisteredUsers
				// 	nameUser={userData.name}
				// 	logOut={logOut}
				// 	ListButtons={<ListButtonOfTeacher setNameClass={setClassId} list={userData.class_permission} />}
				// 	body={<>
						<div className='Teacher'>
							<Routes>
								<Route index element={
									<div>
										<h1>welcome <span style={{ color: "red" }}>{userData.name}</span></h1>
									</div>
								}></Route>
								<Route path='tableListStudent' element={<TableListStudent />}></Route>
								<Route path='showAllExams' element={<ShowAllExams />}></Route>
								<Route path='createExam' element={<CreateExam />} ></Route>
								<Route path='editExam' element={<EditExam />} ></Route>
								<Route path='*' element={location.pathname != "/teacher" && <h1>Teacher *********</h1>} />
							</Routes>
						</div>

				// 	</>}
				// />

			}
		</>
	);
}

export default Teacher;



