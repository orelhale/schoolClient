import './Admin.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { checkToken } from "../functionManager"
import ShowUser from './showUser/ShowUser';
import DataOfTheClasses from './DataOfTheClasses';

import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import ListButtonOfAdmin from './ListButtonOfAdmin';
import DataContext from '../../context/DataContext';


function Admin() {

	let {  setUserData } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)

	let location = useLocation()
	let navigate = useNavigate()


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
		if (location.pathname == "/admin/editUser") {
			navigate("/admin/allUser")
		}
		funcCheckToken()
	}, [])


	// בשביל שריאקט לא ירנדר פעמיים את הפונקציה בהתחלה
	// useEffect(() => {
	// 	if (doOneTime == false) {
	// 		setDoOneTime(true)
	// 	}
	// }, [doOneTime])


	return (<>
		{checksIfShowComponent &&

			// <StyleFor_RegisteredUsers
			// 	nameUser={userData.name}
			// 	logOut={logOut}
			// 	listButtons={<ListButtonOfAdmin />}
			// 	body={

			<div className="Admin">
				<Routes>
					<Route path='allUser' element={<ShowUser />} />
					<Route path='dataOfTheClasses/*' element={<DataOfTheClasses />} />
					<Route path='*' element={location.pathname != "/admin" && <h1>Admin *********</h1>} />
				</Routes>
			</div>

			// 	}
			// />

		}
	</>);
}

export default Admin;