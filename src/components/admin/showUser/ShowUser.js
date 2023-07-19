import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./ShowUser.css";
import EditUser from "../editUser/EditUser";
import Style_BackButton from "../../buttons/Style_BackButton";
import SmallContainer from "../../SmallContainer";
import DataContext from "../../../context/DataContext";
import Email from "../Email";
import GenericTable from "../../tables/GenericTable";
import MyIcon_Edit from "../../myIcons/MyIcon_Edit";
import MyIcon_Delete from "../../myIcons/MyIcon_Delete";
import MyIcon_Mail from "../../myIcons/MyIcon_Mail";
import apiFunction from "../../../functions/apiFunction";

function ShowUser() {

	let { setUserEdit, userEdit, setPopupBody } = useContext(DataContext)

	let [dateFromServer, setDateFromServer] = useState(null);

	useEffect(() => {
		apiFunction("admin/getAllUsers","GET")
			.then((data) => {
				let arr = data.map((item) => {
					// let { name, level_permission, email, class_permission, _id } = item
					let { class_permission } = item
					item.date = new Date(item.Date).toLocaleDateString();
					item.class_permission = !class_permission[0] ? "---" : class_permission.map(item2 => ` ${item2} `)
					// console.log("item == ",item);
					// return { name, level_permission, email, date, class_permission, _id }
					return item
				})

				setDateFromServer(arr)
			})
			.catch((err) => {
				console.log("Error: = ", err);
			})
	}, []);


	const styleContainerTable = { maxWidth: "100%", overflow: 'hidden' };
	const styleAllColumns = { fontWeight: 750 };
	const columns = [
		{
			id: 'name',
			label: 'Name',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'family',
			label: 'Family',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'date',
			label: 'Date',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'level_permission',
			label: 'Role',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		{
			id: 'email',
			label: 'Email',
			styleColumn: { minWidth: 140 },
			styleRow: { minWidth: 140 }
		},
		// {
		// 	id: 'class_permission',
		// 	label: 'class_permission',
		// 	styleColumn: { minWidth: 50 },
		// 	styleRow: { minWidth: 50 }
		// },
		{
			id: '_id',
			label: 'icon',
			styleColumn: { width: 50 },
			styleRow: { width: 30, padding: "16px 16px" }
		},
	]



	return (
		<div className="ShowUser">
			<br></br>
			{dateFromServer &&
				// <TebleOf_ShowUser setUserToEdit={setUserEdit} dateFromServer={dateFromServer} />
				<GenericTable
					defultStyleHeaders={true}
					defultStyleColumns={true}
					columns={columns}
					dataRows={dateFromServer}
					styleContainerTable={styleContainerTable}
					icons={(row, value) => {
						return (
							<span style={{ display: "flex" }}>
								<MyIcon_Edit onClick={() => { setUserEdit(row); console.log("row = ", row) }} />
								<span style={{ marginRight: "10px" }} />
								<MyIcon_Delete onClick={() => { console.log("id = ", value) }} />
								<span style={{ marginRight: "10px" }} />
								<MyIcon_Mail onClick={() => { setPopupBody({ element: <Email email={row.email} name={row.name} afterSended={()=>setPopupBody(null)}/> }) }} />
							</span>
						)
					}}
				/>
			}

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
