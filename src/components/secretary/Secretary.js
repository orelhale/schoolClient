import './Secretary.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { checkToken } from '../functionManager';
import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import DataContext from '../../context/DataContext';


function Secretary() {
	let { userData, setUserData, } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	let navigate = useNavigate()


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("secretary")
		if (!dataFromCheckToken) {
			navigate("/login")
		}
		setChecksIfShowComponent(true)
		setUserData(dataFromCheckToken)
	}


	useEffect(() => {
		funcCheckToken()
	}, [])


	// ****TODO לעשות אותה פונקציה גלובלית
	function logOut() {
		navigate("/login");
		localStorage.removeItem("tokenOfUser")
	}

	return (
		<>
			{checksIfShowComponent &&
				<StyleFor_RegisteredUsers
					nameUser={userData.name}
					logOut={logOut}
					body={
						<div className="Secretary">
							<Routes>
								<Route index element={<h1 style={{ "color": "red" }}>Secretary</h1>} />
								<Route path='1111' element={<h1>Secretary 1111</h1>} />
							</Routes>
						</div>
					}
				/>
			}
		</>
	);
}

export default Secretary;
