import { useEffect, useState } from "react";
import apiFunction from "../../../functions/apiFunction";
import SmallContainer from "../../SmallContainer"
import GenericTable from "../../tables/GenericTable";
import styles from "./style.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import MyIcon_Edit2 from "../../../components/myIcons/MyIcon_Edit2";
import MyIcon_Delete from "../../../components/myIcons/MyIcon_Delete";
import MyIcon_Add from "../../myIcons/MyIcon_Add";


export default function ProfessionList() {
	const [addProfession, setAddProfession] = useState("");
	const [dataRows, setDataRows] = useState([]);

	useEffect(() => {
		apiFunction("professions", "GET")
			.then(data => {
				console.log("data = ", data);
				setDataRows(data)
			})
			.catch((err) => {
				console.log(err);
			})
	}, [])


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
			id: '_id',
			label: 'icon',
			styleColumn: { minWidth: 10 },
			styleRow: { minWidth: 10, padding: "16px 0px" }
		},
	]

	let handleDelete = (id, index) => {
		apiFunction("professions", "DELETE", { id: id })
			.then(data => {
				let copyRow = [...dataRows]
				copyRow.splice(index)
				setDataRows(copyRow)
			})
	}

	let handleEdit = (id) => {
		console.log("id = ", id);

	}

	let handleAdd = () => {
		apiFunction("professions", "POST", { name: addProfession })
			.then(data => {
				let copyRow = [...dataRows]
				copyRow.push(data)
				setDataRows(copyRow)
				setAddProfession("")
			})
	}

	return (
		<div className={styles.ProfessionList}>
			<SmallContainer containerStyle={{ m: 1, width: 450, minHeight: 500 }} paperStyle={{ "padding": '1rem' }}>
				<div className={styles.addProfession}>
					<input value={addProfession} onChange={(e) => setAddProfession(e.target.value)} />
					<MyIcon_Add onClick={handleAdd}/>
				</div>
				<GenericTable
					columns={columns}
					dataRows={dataRows}
					styleContainerTable={styleContainerTable}
					styleAllColumns={styleAllColumns}
					icons={(row, value, index) => {
						return <span style={{ display: "flex" }}>
							<MyIcon_Edit2 onClick={() => { handleEdit(row._id, index) }} />
							<span style={{ marginRight: "20px" }} />
							<MyIcon_Delete onClick={() => { handleDelete(row._id, index) }} />
						</span>
					}}
				/>
			</SmallContainer>
		</div>
	)
}