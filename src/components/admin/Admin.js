import './Admin.css';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { checkToken, logOut } from "../functionManager"
import ShowUser from './showUser/ShowUser';
import EditUser from './editUser/EditUser';
import DataOfTheClasses from './DataOfTheClasses';
import AddNewClass from './AddNewClass';

import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import ListButtonOfAdmin from './ListButtonOfAdmin';
import DataContext from '../../context/DataContext';


function Admin() {

	let { userData, setUserData } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	let [dataToEditUser, setDataToEditUser] = useState(null)

	let [classToEdit, setClassToEdit] = useState(null)

	let location = useLocation()
	let navigate = useNavigate()
	let [doOneTime, setDoOneTime] = useState(false)


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("admin")
		if (!dataFromCheckToken) {
			navigate("/login")
		}
		setUserData(dataFromCheckToken)
		setChecksIfShowComponent(true)
	}


	useEffect(() => {
		// בודק שראיקט לא עובד פעמיים ואח"כ עושה את הפעולה הראשונה 
		if (doOneTime == true) {
			if (location.pathname == "/admin/editUser" && dataToEditUser == null) {
				navigate("/admin/allUser")
			}
			funcCheckToken()
		}
	}, [doOneTime])


	// בשביל שריאקט לא ירנדר פעמיים את הפונקציה בהתחלה
	useEffect(() => {
		if (doOneTime == false) {
			setDoOneTime(true)
		}
	}, [doOneTime])


	useEffect(() => {
		if (userData) {
			console.log("Teacher: data About User = ", userData)
		}
	}, [userData])


	function logOut() {
		navigate("/login");
		localStorage.tokenOfUser = " ";
	}


	let sendSetClassToEdit = (data) => {
		setClassToEdit(data)
		navigate("./addNewClass");
	}


	return (<>
		{checksIfShowComponent &&
			<StyleFor_RegisteredUsers
				nameUser={userData.name}
				logOut={logOut}
				ListButtons={<ListButtonOfAdmin />}
				body={
					<div className="Admin">
						<Routes>
							<Route path='allUser' element={<ShowUser setDataToEditUser={setDataToEditUser} />} />
							<Route path='editUser' element={<EditUser dataToEditUser={dataToEditUser} />} />
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
