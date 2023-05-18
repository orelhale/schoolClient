import { useLocation, useNavigate } from "react-router-dom"
import Header from "../Header"
import Main from "../Main"
import Nav from "../Nav"
import ContainerMain from "../ContainerMain"
import DataContext from "../../context/DataContext"
import { useContext, useEffect } from "react"

export default function Layout() {
	let { userData } = useContext(DataContext)

	let navigate = useNavigate()
	let location = useLocation()

	useEffect(() => {
		if (userData) {
			console.log("userData = ", userData);
		}
	}, [userData])

	return (
		<div className="Layout">

			<ContainerMain
				nameUser={userData && userData.name}
				logOut={() => { navigate("/login"); }}
				listButtons={<Nav />}
				showListButtons={!["/", "/login", "/registration"].includes(location.pathname)}
			>
				<Main />
			</ContainerMain>

		</div>
	)
}