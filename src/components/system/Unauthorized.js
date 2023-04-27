import "./Unauthorized.css"
import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkToken } from '../functionManager';
import { UserContext } from "../../App"
import StyleFor_RegisteredUsers from "../style/StyleFor_RegisteredUsers";

function Unauthorized() {

	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	const ValueUseContext = useContext(UserContext);

	let navigate = useNavigate()

	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("Unauthorized")
		if(!dataFromCheckToken){
			navigate("/login")
		}
		setChecksIfShowComponent(true)
		ValueUseContext.set(dataFromCheckToken)
	}

	
	useEffect(()=>{
		funcCheckToken()
	},[])

	
	// ****TODO לעשות אותה פונקציה גלובלית
	function logOut() {
		navigate("/login");
		localStorage.removeItem("tokenOfUser")
	}

	
	return (
		<>
		{checksIfShowComponent && 
			<StyleFor_RegisteredUsers
				nameUser={ValueUseContext.dataOfUser.name} 
				logOut={logOut} 
				body={
					<div className='Unauthorized'>
						<Routes>
							<Route index element={<h1 style={{"color": "red"}}>** You don't have access yet **</h1>} />
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