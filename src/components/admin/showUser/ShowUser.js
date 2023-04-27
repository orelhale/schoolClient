import axios from "axios";
import { useEffect, useState } from "react";
import "./ShowUser.css";
import { useNavigate } from "react-router-dom";
import TebleOf_ShowUser from "../../tables/TebleOf_ShowUser";
import EditUser from "../editUser/EditUser";
import Style_BackButton from "../../style/Style_BackButton";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Diversity1 } from "@mui/icons-material";

function ShowUser(props) {
  let [userToEdit, setUserToEdit] = useState(null);
  let [allData, setAllData] = useState(null);
  let [stop, setStop] = useState("");
  let [ponit, setPonit] = useState(".");
  let [dateFromServer, setDateFromServer] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
		axios.get("http://localhost:4000/admin/getAllUsers").then(
			(data) => {
			funcShowUser(data.data);
			setDateFromServer(data.data)
			},
			(err) => {
			setAllData(<h3>Network Error</h3>);
			}
		);
		return () => {
			clearInterval(stop);
		};
  }, []);


  useEffect(() => {
    clearInterval(stop);
    if (!allData) {
      setStop(
        setTimeout(() => {
          ponit == "..." ? setPonit(".") : setPonit(ponit + ".");
          console.log(ponit);
        }, 400)
      );
    }
  }, [ponit]);

	function funcShowUser(data) {
		let sendData = data.map((item) => {
			let arr = [];
			for (const iterator in item) {
				arr.push(iterator);
			}
			
			return (
			<>
				<div
					className="cardUser"
					onClick={() => {
					console.log("item = ", item);
					props.setDataToEditUser(item);
					navigate("/admin/editUser");
					}}
				>
					{arr.map((item2) => (
					<p>
						<span style={{ color: "red", "font-weight": 700 }}>
							{item2}:{" "}
						</span>{" "}
						{item[item2] == "" ? " - - - " : item[item2]}
					</p>
					))}
				</div>
			</>
			);
		});
		setAllData(sendData);
  }
  

  useEffect(()=>{
	console.log("dateFromServer = ",dateFromServer);
  },[dateFromServer])
  return (
		<div className="ShowUser">
			<h1>List user</h1>
			<br></br>
			{dateFromServer && <TebleOf_ShowUser dateFromServer={dateFromServer} setUserToEdit={setUserToEdit}/>}
			
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
						<Paper elevation={3} sx={{padding: "30px",}}>
							<Style_BackButton onClick={()=>{setUserToEdit(null)}}/>
							<div className="ontainerEditUser">	
								<EditUser dataToEditUser={userToEdit} setDateFromServer={setDateFromServer} setUserToEdit={setUserToEdit}/>
							</div>
						</Paper>
					</Box>
					
				</div>
			}
			{!allData && <h3>Waiting for a response from the server {ponit} </h3>}
			{/* {allData}      */}

    </div>
  );
}

export default ShowUser;
