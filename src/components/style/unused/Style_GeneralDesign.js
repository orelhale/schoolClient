
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState , createContext } from 'react';
import { checkToken } from '../../functionManager';
import StyleFor_RegisteredUsers from '../StyleFor_RegisteredUsers';
import { UserContext } from "../../../App"


export let NameOfClassContext = createContext()

function Style_GeneralDesign() {
	let navigate = useNavigate()
	let location = useLocation()

	const ValueUseContext = useContext(UserContext);
	let [state_of_NameOfClassContext, setState_of_NameOfClassContext] = useState(null)

	let [check, setCheck] = useState(false)


	async function funcCheckToken() {
        // לשנות לדף הנכון
		let checkTokenOfUser = await checkToken("teacher")
		if(!checkTokenOfUser){
			navigate("/login")
		}
		setCheck(true)
		ValueUseContext.set(checkTokenOfUser)
	}


	useEffect(()=>{
        if(ValueUseContext.dataOfUser){
            console.log("Value Of User = ",ValueUseContext.dataOfUser)
        }
    },[ValueUseContext.dataOfUser]) 



	useEffect(()=>{
		funcCheckToken()
	},[])



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
				nameUser={ValueUseContext.dataOfUser.name} 
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