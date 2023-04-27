import './System.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from "../system/login/Login"
import { useEffect } from 'react';
import Register from './register/Register';
import StyleFor_Login from '../style/StyleFor_Login';


function System() {
	let location = useLocation()
	let navigate = useNavigate()


	useEffect(()=>{
		if(location.pathname == "/"){
			navigate('/login')
		}
	},[location.pathname])

	
  	return (
		<div className="System">
			<Routes>
				<Route path='login' element={<StyleFor_Login bodyOfBasicDesign={<Login />} />} />
				<Route path='registration' element={<StyleFor_Login bodyOfBasicDesign={<Register />} />} />
				<Route path='*' element={<h1>System *********</h1>} />
			</Routes>
		</div>
  	);

	
}

export default System;
