import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./ShowUser.css";
import { useNavigate } from "react-router-dom";
import TebleOf_ShowUser from "../../tables/TebleOf_ShowUser";
import EditUser from "../editUser/EditUser";
import Style_BackButton from "../../style/Style_BackButton";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import WaitForServer from "../WaitForServer";
import { Diversity1 } from "@mui/icons-material";
import SmallContainer from "../../SmallContainer";
import DataContext from "../../../context/DataContext";

function ShowUser() {

	let { setUserEdit, userEdit } = useContext(DataContext)

	let [dateFromServer, setDateFromServer] = useState(null);

	useEffect(() => {
		axios.get("http://localhost:4000/admin/getAllUsers")
			.then(
				(data) => {
					setDateFromServer(data.data)
				})
			.catch((err) => {
				console.log("Error: = ", err);
			})
	}, []);



	useEffect(() => {
		console.log("dateFromServer = ", dateFromServer);
	}, [dateFromServer])
	return (
		<div className="ShowUser">
			<br></br>
			{dateFromServer && <TebleOf_ShowUser setUserToEdit={setUserEdit} />}

			{userEdit &&
				<div className="wrapEditUser">

					<SmallContainer containerStyle={{ width: 550, padding: 3, }} defaultStyle={{ display: 'flex', flexWrap: 'wrap' }}>

						<Style_BackButton onClick={() => { setUserEdit(null) }} />
						<div className="ontainerEditUser">
							<EditUser setDateFromServer={setDateFromServer} />
						</div>
					</SmallContainer>

				</div>
			}
		</div>
	);
}

export default ShowUser;
