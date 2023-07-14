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
import Overview from './Overview';


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
		setClassId(dataFromCheckToken.class_permission[0] ? dataFromCheckToken.class_permission[0] : "-")
		setUserData(dataFromCheckToken)
	}

	useEffect(() => {
		if (userData, classId) {
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


	return (<>
		{checksIfShowComponent &&
			<div className='Teacher'>
				<Routes>
					<Route index element={<h1>welcome <span style={{ color: "red" }}>{userData.name}</span></h1>} />
					<Route path='tableListStudent' element={<TableListStudent />} />
					<Route path='showAllExams' element={<ShowAllExams />} />
					<Route path='createExam' element={<CreateExam />} />
					<Route path='editExam' element={<EditExam />} />
					<Route path='overview' element={<Overview />} />
				</Routes>
			</div>
		}
	</>);
}

export default Teacher;