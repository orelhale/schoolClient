import './Admin.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { checkToken } from "../functionManager"
import ShowUser from './showUser/ShowUser';
import DataOfTheClasses from './DataOfTheClasses';
import ProfessionList from './ProfessionList';
import DataContext from '../../context/DataContext';
import ListEducationalPrograms from './ListEducationalPrograms';
import apiFunction from '../../functions/apiFunction';


function Admin() {

	let location = useLocation()
	let navigate = useNavigate()

	let { setUserData } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)

	
	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("admin")
		if (!dataFromCheckToken) {
			navigate("/login")
		}
		setUserData(dataFromCheckToken)
		setChecksIfShowComponent(true)
	}

	useEffect(() => {
		if (location.pathname == "/admin/editUser") {
			navigate("/admin/allUser")
		}
		funcCheckToken()
	}, [])


	return (<>
		{checksIfShowComponent &&
			<div className="Admin">
				<Routes>
					<Route path='allUser' element={<ShowUser />} />
					<Route path='dataOfTheClasses/*' element={<DataOfTheClasses />} />
					<Route path='professionList/*' element={<ProfessionList />} />
					<Route path='listEducationalPrograms/*' element={<ListEducationalPrograms />} />
					<Route path='*' element={location.pathname != "/admin" && <h1>Admin *********</h1>} />
				</Routes>
			</div>
		}
	</>);
}

export default Admin;