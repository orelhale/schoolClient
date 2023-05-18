
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { checkToken } from '../../functionManager';
import StyleFor_RegisteredUsers from '../StyleFor_RegisteredUsers';
import DataContext from '../../../context/DataContext';



function Style_GeneralDesign() {
	let navigate = useNavigate()

	let { setUserData, userData } = useContext(DataContext)

	let [check, setCheck] = useState(false)

	async function funcCheckToken() {
		// לשנות לדף הנכון
		let checkTokenOfUser = await checkToken("teacher")
		if (!checkTokenOfUser) {
			navigate("/login")
		}
		setCheck(true)
		setUserData(checkTokenOfUser)
	}


	useEffect(() => {
		if (userData) {
			console.log("Value Of User = ", userData)
		}
	}, [userData])



	useEffect(() => {
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
			{check &&
				<StyleFor_RegisteredUsers
					nameUser={userData.name}
					logOut={logOut}
					body={
						<div className="Style_GeneralDesign">

						</div>
					}
				/>
			}
		</>
	);
}

export default Style_GeneralDesign;