import { useNavigate } from "react-router-dom"
import Header from "../Header"
import Main from "../Main"
import Nav from "../Nav"
import ContainerMain from "../ContainerMain"

export default function Layout() {

	let navigate = useNavigate()

	return (
		<div className="Layout">
			<ContainerMain
				nameUser={"ValueUseContext.dataOfUser.name"}
				logOut={() => { navigate("/login"); }}
				ListButtons={<Nav />}
				// drawerData={{nameUser: "orel",ListButtons:<h1>ListButtons</h1>}}
				body={<Main />}
			/>
		</div>
	)
}