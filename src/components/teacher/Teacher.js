import './Teacher.css';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import TableListStudent from "./tableListStudent/TableListStudent"
import { useContext, useEffect, useState , createContext } from 'react';
import { checkToken } from '../functionManager';
import { UserContext } from "../../App"
import Exams from './exams/Exams';
import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import ListButtonOfTeacher from './ListButtonOfTeacher';
import ShowAllExams from './showAllExams/ShowAllExams';
import CreateExam from './createExam/CreateExam';
import { Box, Paper } from '@mui/material';

export let NameOfClassContext = createContext()
 
function Teacher() {
	let navigate = useNavigate()
	let location = useLocation()

	const ValueUseContext = useContext(UserContext);
	let [state_of_NameOfClassContext, setState_of_NameOfClassContext] = useState(null)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	let [specificExam, setSpecificExam] = useState(null)


	useEffect(()=>{
		if (specificExam) {
			navigate("/teacher/createExam")
		}
   },[specificExam])


	useEffect(()=>{
		if (state_of_NameOfClassContext) {
			console.log("state_of_NameOfClassContext = ",state_of_NameOfClassContext);
		}
   },[state_of_NameOfClassContext])


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("teacher")
		if(!dataFromCheckToken){
			navigate("/login")
		}
		console.log("dataFromCheckToken = ",dataFromCheckToken);
		// console.log("dataFromCheckToken = ",dataFromCheckToken.class_permission[0]);
		// setState_of_NameOfClassContext(dataFromCheckToken.class_permission[0]? dataFromCheckToken.class_permission[0] : "-")
		setState_of_NameOfClassContext(dataFromCheckToken.class_permission[0]? dataFromCheckToken.class_permission[0] : "-")
		console.log(dataFromCheckToken.class_permission[0]);
		ValueUseContext.set(dataFromCheckToken)
	}


	useEffect(()=>{
		// console.log("ss");
		// console.log(ValueUseContext.dataOfUser);
		// console.log(state_of_NameOfClassContext);
		// console.log();
		if(ValueUseContext.dataOfUser,state_of_NameOfClassContext){
			console.log("Teacher: data About User = ",ValueUseContext.dataOfUser)
			console.log("state_of_NameOfClassContext = ",state_of_NameOfClassContext)
			setChecksIfShowComponent(true)
		}
	},[ValueUseContext,state_of_NameOfClassContext])


	useEffect(()=>{
		if(location.pathname == "/teacher"){
			setState_of_NameOfClassContext(null)
		}
		if(!state_of_NameOfClassContext){
			if(location.pathname == "/teacher/tableListStudent"){
				navigate("")
				setState_of_NameOfClassContext(null)
			}
		}
		funcCheckToken()
	},[])


   useEffect(()=>{
      if(state_of_NameOfClassContext){
         console.log("state_of_NameOfClassContext = ",state_of_NameOfClassContext);
      }
   },[state_of_NameOfClassContext])



	// ****TODO לעשות אותה פונקציה גלובלית
	function logOut() {
		navigate("/login");
		localStorage.removeItem("className")
		localStorage.removeItem("tokenOfUser")
	}

   	return (
	
		<NameOfClassContext.Provider value={state_of_NameOfClassContext}>
			{checksIfShowComponent && 
			<StyleFor_RegisteredUsers
				nameUser={ValueUseContext.dataOfUser.name} 
				logOut={logOut} 
				ListButtons={<ListButtonOfTeacher setNameClass={setState_of_NameOfClassContext} list={ValueUseContext.dataOfUser.class_permission} />} 
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
									<h1>welcome <span style={{color: "red"}}>{ValueUseContext.dataOfUser.name}</span></h1>
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
							<Route path='showAllExams' element={<ShowAllExams setSpecificExam={setSpecificExam}/>}></Route>
                    	<Route path='createExam' element={<CreateExam  specificExam={specificExam}/>} ></Route>
							<Route path='*' element={location.pathname != "/teacher" && <h1>Teacher *********</h1>} />
						</Routes>
					{/* </Paper> */}
					{/* </Box> */}
						{/* <Routes>
							<Route index element={<h1>welcome <span style={{color: "red"}}>{ValueUseContext.dataOfUser.name}</span></h1>}></Route>
							<Route path='tableListStudent' element={<TableListStudent />}></Route>
							<Route path='showAllExams' element={<ShowAllExams setSpecificExam={setSpecificExam}/>}></Route>
                    		<Route path='createExam' element={<CreateExam  specificExam={specificExam}/>} ></Route>
							<Route path='*' element={location.pathname != "/teacher" && <h1>Teacher *********</h1>} />
						</Routes> */}
					</div>
				</>}
			/>
			} 
			{/* {munyDiv} */}
		</NameOfClassContext.Provider>
  	);
}

export default Teacher;



