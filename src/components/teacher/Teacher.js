import './Teacher.css';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import TableListStudent from "./tableListStudent/TableListStudent"
import { useContext, useEffect, useState, createContext } from 'react';
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


	// useEffect(()=>{
	// 	if (classId) {
	// 		console.log("classId = ",classId);
	// 	}
	// },[classId])


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("teacher")
		if (!dataFromCheckToken) {
			navigate("/login")
		}

		// console.log("dataFromCheckToken = ",dataFromCheckToken);
		// console.log("dataFromCheckToken = ",dataFromCheckToken.class_permission[0]);
		// setClassId(dataFromCheckToken.class_permission[0]? dataFromCheckToken.class_permission[0] : "-")
		console.log("dataFromCheckToken = ", dataFromCheckToken);
		setClassId(dataFromCheckToken.class_permission[0] ? dataFromCheckToken.class_permission[0] : "-")
		// console.log(dataFromCheckToken.class_permission[0]);
		setUserData(dataFromCheckToken)
	}


	useEffect(() => {
		// console.log("ss");
		// console.log(userData);
		// console.log(classId);
		// console.log();
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
				<StyleFor_RegisteredUsers
					nameUser={userData.name}
					logOut={logOut}
					ListButtons={<ListButtonOfTeacher setNameClass={setClassId} list={userData.class_permission} />}
					body={<>
						<div className='Teacher'>
							{/* <Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						"justifyContent": 'center',
						'& > :not(style)': {
							m: 1,
							width: 550,
							minHeight: 500
						},
					}}
					> */}
							{/* <Paper elevation={3} sx={{"padding": '1rem 0rem'}}> */}
							<Routes>
								<Route index element={
									<div>
										<h1>welcome <span style={{ color: "red" }}>{userData.name}</span></h1>
										{/* *** שדה הערות לעצמי: בסיום הפרוייקט למחוק *** */}
										{/* <div className='designNotesForMyself'>
										<h2>:הערות לעצמי</h2>
										<p>1</p>
										<p><span style={{color: "red"}}>טבלת נתונים:</span> להגביל שנת לימודים</p>
										<p>2</p>
										<p>בדיקת טוקן כאשר יש שינוי בנתונים</p>
										<p>3</p>
										<p><span style={{color: "red"}}>בעייה כללית:</span> המערכת טוענת נתונים של אותה כיתה </p>
										<p>שוב כאשר היא עוברת בין טבלה למבחנים והפוך</p>
										<p>4</p>
										<p><span style={{color: "red"}}>שיפור:</span> להגביל שנת לימודים </p>
										<p>5</p>
										<p><span style={{color: "red"}}>שיפור:</span> לעשות מחיקת מבחן </p>
										<p>5</p>
										<p><span style={{color: "red"}}>__:</span> __ </p>
									</div> */}
									</div>
								}></Route>
								<Route path='tableListStudent' element={<TableListStudent />}></Route>
								<Route path='showAllExams' element={<ShowAllExams />}></Route>
								<Route path='createExam' element={<CreateExam />} ></Route>
								<Route path='editExam' element={<EditExam />} ></Route>
								<Route path='*' element={location.pathname != "/teacher" && <h1>Teacher *********</h1>} />
							</Routes>
							{/* </Paper> */}
							{/* </Box> */}
							{/* <Routes>
							<Route index element={<h1>welcome <span style={{color: "red"}}>{userData.name}</span></h1>}></Route>
							<Route path='tableListStudent' element={<TableListStudent />}></Route>
							<Route path='showAllExams' element={<ShowAllExams setSpecificExam={setSpecificExam}/>}></Route>
                    		<Route path='createExam' element={<CreateExam  specificExam={specificExam}/>} ></Route>
							<Route path='*' element={location.pathname != "/teacher" && <h1>Teacher *********</h1>} />
						</Routes> */}
						</div>
					</>}
				/>
			}
		</>
	);
}

export default Teacher;



