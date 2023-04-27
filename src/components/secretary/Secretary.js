import './Secretary.css';
import { Route, Routes , useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { checkToken } from '../functionManager';
import StyleFor_RegisteredUsers from '../style/StyleFor_RegisteredUsers';
import { UserContext } from "../../App"


function Secretary() {
	const ValueUseContext = useContext(UserContext);
	let [checksIfShowComponent, setChecksIfShowComponent] = useState(false)
	let navigate = useNavigate()


	async function funcCheckToken() {
		let dataFromCheckToken = await checkToken("secretary")
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
					<div className="Secretary">
						<Routes>
							<Route index element={<h1 style={{"color": "red"}}>Secretary</h1>} />
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
