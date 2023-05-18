import "./Unauthorized.css"
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkToken } from '../functionManager';
import StyleFor_RegisteredUsers from "../style/StyleFor_RegisteredUsers";
import DataContext from "../../context/DataContext";

function Unauthorized() {
	let { setUserData, userData } = useContext(DataContext)

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)

	let navigate = useNavigate()

	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("Unauthorized")
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
						<div className='Unauthorized'>
							<Routes>
								<Route index element={<h1 style={{ "color": "red" }}>** You don't have access yet **</h1>} />
								<Route path='*' element={<h1>Unauthorized *********</h1>} />
							</Routes>
						</div>
					}
				/>
			}
		</>
	);
}

export default Unauthorized