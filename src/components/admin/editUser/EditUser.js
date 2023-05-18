import { useContext, useEffect, useState } from "react";
import "./EditUser.css";
import axios from "axios";
import Component_MultiSelect from "../../Component_MultiSelect";
import Style_BasicButton from "../../style/Style_BasicButton";
import DataContext from "../../../context/DataContext";

function EditUser(props) {
	// שומר את כל הנתונים של המשתמש
	let { setUserEdit, userEdit } = useContext(DataContext)

	// שומר את רמת השמתמש המקורית + את השינוי
	let [newLevelPermission, setNewLevelPermission] = useState(null);

	// שומר את כל השמות של הכיתות שיש בבית הספר כאבייקטים ושולח אותם לקומפוננטה של הרשימת בחירת כיתות
	let [optionsMultiSelect, setOptionsMultiSelect] = useState([]);

	// מחזיק את כל השינויים שנעשו ברשימת פתיחה של בחירת כיתה
	let [selected, setSelected] = useState([]);

	// רשימת רמת גישה
	let listLevel = ["Unauthorized", "admin", "teacher", "secretary"];



	useEffect(() => {
		if (userEdit && !optionsMultiSelect[0]) {
			setNewLevelPermission(userEdit.level_permission);
			console.log("dataToEditUser = ", userEdit);

			axios
				.get("http://localhost:4000/admin/getListOf_ClassNameAndClassId")
				// אם יהיה בעיות להחזיר
				// .get("http://localhost:4000/admin/getListOfAllTheClasses")
				.then((listClass) => {

					// אם יהיה בעיות להחזיר
					// let arrAllOptions = listClass.data.map((c) => {
					// 	return { label: c, value: c+"d" };
					// });

					let arrAllOptions = listClass.data.map((c) => {
						return { label: c.nameOfClass, value: c._id };
					});
					setOptionsMultiSelect(arrAllOptions);

					let arrAllOptionsThatSelected = [];
					if (typeof userEdit.class_permission == "object") {
						userEdit.class_permission.forEach((nameOfClass) => {
							nameOfClass = nameOfClass.replaceAll(" ", "");

							if (listClass.data.includes(nameOfClass) == true) {
								arrAllOptionsThatSelected.push({
									label: nameOfClass,
									value: nameOfClass,
								});
							}
						});
					}

					setSelected((eee) => {
						return [...arrAllOptionsThatSelected, ...eee];
					});
				});
		}
	}, [userEdit]);

	function update() {
		console.log("userEdit = ", userEdit);
		let newListClass = [];
		if (newLevelPermission == "teacher") {
			newListClass = selected.map((e) => e.value);
		}

		let data = {
			id: userEdit._id,
			email: userEdit.email,
			class_permission: newListClass,
			level_permission: newLevelPermission,
		};
		console.log("data of userEdit = ", data);
		userEdit.class_permission = newListClass;
		userEdit.level_permission = newLevelPermission;


		axios.put("http://localhost:4000/admin/editUser", data).then((dddd) => {
			console.log("dddd = ", dddd);
			props.setDateFromServer((e) => {
				let arr = [...e]
				arr.splice(arr.findIndex(e => e.email == userEdit.email), 1, userEdit)
				return arr
			})
			setUserEdit(null);
		});
	}


	useEffect(() => {
		if (selected) {
			console.log("selected = ", selected);
		}
	}, [selected])

	return (
		<div>
			{userEdit && (
				<div>
					{newLevelPermission && (
						<form>
							<br />
							{/* https://mui.com/material-ui/react-radio-button/ */}
							{/* אם יהיה זמן - לשנות לעצוב יותר יפה */}
							{listLevel.map((nameLevel, i2) => {
								return (
									<>
										<label for={nameLevel} className="inputRadio">
											<input
												checked={newLevelPermission == nameLevel ? true : false}
												type="radio"
												name="_"
												onClick={() => {
													setNewLevelPermission(nameLevel);
												}}
											/>
											{" " + nameLevel}
										</label>
										<br />
									</>
								);
							})}
						</form>
					)}
					{/*רשימה נפתחת כאשר המשתמש הוא מורה */}
					{newLevelPermission == "teacher" && (
						<>
							<br />
							<Component_MultiSelect
								title="List class"
								options={optionsMultiSelect}
								selected={selected}
								setSelected={setSelected}
							/>
						</>
					)}

					<br />
					<Style_BasicButton text={"Update"} onClick={update} />
				</div>
			)}
		</div>
	);
}

export default EditUser;
