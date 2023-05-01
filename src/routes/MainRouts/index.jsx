import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import PageRegister from "../../components/system/register/Register";
import Teacher from "../../components/teacher/Teacher";
import Admin from "../../components/admin/Admin";
import Secretary from "../../components/secretary/Secretary";
import Unauthorized from "../../components/system/Unauthorized";
import PageLogin from "../../components/system/login/Login";


export default function MainRouts() {
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