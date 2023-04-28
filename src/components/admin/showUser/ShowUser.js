import axios from "axios";
import { useEffect, useState } from "react";
import "./ShowUser.css";
import { useNavigate } from "react-router-dom";
import TebleOf_ShowUser from "../../tables/TebleOf_ShowUser";
import EditUser from "../editUser/EditUser";
import Style_BackButton from "../../style/Style_BackButton";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import WaitForServer from "../WaitForServer";
import { Diversity1 } from "@mui/icons-material";

function ShowUser(props) {
	let [userToEdit, setUserToEdit] = useState(null);
	let [dateFromServer, setDateFromServer] = useState(null);
	let navigate = useNavigate();

	useEffect(() => {
		axios.get("http://localhost:4000/admin/getAllUsers").then(
			(data) => {
				// throw "ddddd"
				// console.log("data getAllUsers= ",data.data);
				// funcShowUser(data.data);
				// console.log("data funcShowUser= ",data.data);
				setDateFromServer(data.data)
			},
			(err) => {
			}
		);

	}, []);



	useEffect(() => {
		console.log("dateFromServer = ", dateFromServer);
	}, [dateFromServer])
	return (
		<div className="ShowUser">
			<br></br>
			{dateFromServer && <TebleOf_ShowUser setUserToEdit={setUserToEdit} />}

			{userToEdit &&
				<div className="wrapEditUser">
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							'& > :not(style)': {
								m: 1,
								width: 350,
								height: 500,
							},
						}}
					>
						<Paper elevation={3} sx={{ padding: "30px", }}>
							<Style_BackButton onClick={() => { setUserToEdit(null) }} />
							<div className="ontainerEditUser">
								<EditUser dataToEditUser={userToEdit} setDateFromServer={setDateFromServer} setUserToEdit={setUserToEdit} />
							</div>
						</Paper>
					</Box>

				</div>
			}
		</div>
	);
}

export default ShowUser;
