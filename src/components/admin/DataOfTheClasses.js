import { Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, Route, Routes } from "react-router-dom"
import Style_ButtonAdd from "../style/Style_ButtonAdd"
import TebleOf_AddingClassOrEditingClass from "../tables/TebleOf_AddingClassOrEditingClass"
import TebleOf_DataOfTheClasses from "../tables/TebleOf_DataOfTheClasses"
import AddNewClass from "./AddNewClass"
import EditingClass from "./EditingClass"
import SmallContainer from "../SmallContainer"



export default function DataOfTheClasses() {
    let [classToEdit, setClassToEdit] = useState(null)
    let [rows, setRows] = useState([])

    let navigate = useNavigate();

    let sendSetClassToEdit = (data) => {
        setClassToEdit(data)
        navigate("editClass");
    }

    useEffect(() => {
        if (rows) {
            console.log("rows in D= ", rows);
        }
    }, [rows])

    return (
        <div className="DataOfTheClasses">
            
            <SmallContainer containerStyle={{ m: 1, width: 550, minHeight: 500 }} paperStyle={{ "padding": '1rem' }}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <div style={{ width: "100%", "text-align": "center" }}>
                                <Style_ButtonAdd text={"Add new class"} onClick={() => { navigate("addNewClass") }} />
                            </div>
                            <br />
                            <TebleOf_DataOfTheClasses sendSetClassToEdit={sendSetClassToEdit} rows={rows} setRows={setRows} />
                        </>
                    }></Route>
                    <Route path="/editClass" element={<EditingClass classToEdit={classToEdit} setClassToEdit={setClassToEdit} setRows={setRows} />} />
                    <Route path='addNewClass' element={<AddNewClass classToEdit={classToEdit} setClassToEdit={setClassToEdit} setRows={setRows} />} />
                </Routes>
            </SmallContainer>
        </div>
    )
}
