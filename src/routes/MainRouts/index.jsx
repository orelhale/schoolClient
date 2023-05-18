import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageRegister from "../../components/system/register/Register";
import Teacher from "../../components/teacher/Teacher";
import Admin from "../../components/admin/Admin";
import Secretary from "../../components/secretary/Secretary";
import Unauthorized from "../../components/system/Unauthorized";
import PageLogin from "../../components/system/login/Login";
import { useEffect } from "react";


export default function MainRouts() {
	let location = useLocation()
	let nav = useNavigate()

	useEffect(() => {
		if (location.pathname == "/") {
			nav("login")
		}
	}, [])

	return (
		<Routes>
			<Route path='login' element={<PageLogin />} />
			<Route path='registration' element={<PageRegister />} />

			<Route path="teacher/*" element={<Teacher />} />

			<Route path="admin/*" element={<Admin />} />

			<Route path="secretary/*" element={<Secretary />} />

			<Route path="unauthorized/*" element={<Unauthorized />} />
		</Routes>
	)
}