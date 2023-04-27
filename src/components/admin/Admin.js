import './Admin.css';
import { Link, Route, Routes , useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { checkToken, logOut } from "../functionManager"
import ShowUser from './showUser/ShowUser';
import EditUser from './editUser/EditUser';
import DataOfTheClasses from './DataOfTheClasses';
import AddNewClass from './AddNewClass';

import { UserContext } from "../../App"
import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import ListButtonOfAdmin from './ListButtonOfAdmin';


function Admin() {
	const ValueUseContext = useContext(UserContext);
	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	let [dataToEditUser, setDataToEditUser] = useState(null)

	let [classToEdit, setClassToEdit] = useState(null)

	let location = useLocation()
	let navigate = useNavigate()
	let [doOneTime, setDoOneTime] = useState(false)

	
	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("admin")
		if(!dataFromCheckToken){
			navigate("/login")
		}
		ValueUseContext.set(dataFromCheckToken)
		setChecksIfShowComponent(true)
	}


	useEffect(()=>{
		// בודק שראיקט לא עובד פעמיים ואח"כ עושה את הפעולה הראשונה 
		if(doOneTime == true){
			if(location.pathname == "/admin/editUser" && dataToEditUser == null){
				navigate("/admin/allUser")
			}
			funcCheckToken()
		}
	},[doOneTime])


	// בשביל שריאקט לא ירנדר פעמיים את הפונקציה בהתחלה
	useEffect(()=>{
		if(doOneTime == false){
			setDoOneTime(true)
		}
	},[doOneTime])


	useEffect(()=>{
        if(ValueUseContext.dataOfUser){
            console.log("Teacher: data About User = ",ValueUseContext.dataOfUser)
        }
    },[ValueUseContext.dataOfUser])


	function logOut() {
		navigate("/login");
		localStorage.tokenOfUser = " ";
	}


	let sendSetClassToEdit = (data)=>{
		setClassToEdit(data)
		navigate("./addNewClass");
	}


  	return (<>
		{checksIfShowComponent && 
		<StyleFor_RegisteredUsers
			nameUser={ValueUseContext.dataOfUser.name} 
			logOut={logOut}
			ListButtons={<ListButtonOfAdmin />}
			body={
				<div className="Admin">
					<Routes>
						<Route index element={
							<div>
								<h1>welcome <span style={{color: "red"}}>{ValueUseContext.dataOfUser.name}</span></h1>
								{/* *** שדה הערות לעצמי: בסיום הפרוייקט למחוק *** */}
								<div className='designNotesForMyself'>
									<h2>:הערות לעצמי</h2>
									<p>1</p>
									<p><span style={{color: "red"}}>בעיה:</span> בעריכת כיתה - לאחר שהיה עדכון בכיתה, צריך לעדכן ברשימת הכיתות את הכיתה שהתעדכנה </p>
									
									<p>2</p>
									<p><span style={{color: "red"}}>בעיה:</span> כאשר מוחקים כיתה - השם של הכיתה עדיין נשמר ברשימת רמת גישה של המורה </p>
									<p>3</p>
									<p><span style={{color: "red"}}>בעיה:</span> כאשר מוחקים כיתה - צריך גם למחוק את הנתונים היומיים והמבחנים של אותה כיתה  </p>
									<p>4</p>
									<p><span style={{color: "red"}}>__:</span> __ </p>
								</div>
							</div>
						}></Route>
						<Route path='allUser' element={<ShowUser setDataToEditUser={setDataToEditUser}/>} />
						<Route path='editUser' element={<EditUser dataToEditUser={dataToEditUser}/>} />
						<Route path='dataOfTheClasses/*' element={<DataOfTheClasses sendSetClassToEdit={sendSetClassToEdit} />} />
						<Route path='*' element={location.pathname != "/admin" && <h1>Admin *********</h1>} />
					</Routes>
				</div>
			}
		/>
		}
	</>);
}

export default Admin;
