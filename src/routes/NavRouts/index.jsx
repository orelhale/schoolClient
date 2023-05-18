import { Route, Routes } from "react-router-dom";
import ListButtonOfAdmin from "../../components/admin/ListButtonOfAdmin";
import ListButtonOfTeacher from "../../components/teacher/ListButtonOfTeacher";

export default function NavRouts() {
	return (
		<Routes>
			<Route path="/">
				<Route path="teacher" element={<ListButtonOfTeacher />} />
				<Route path="admin" element={<ListButtonOfAdmin />} />
			</Route>
		</Routes>
	)
}