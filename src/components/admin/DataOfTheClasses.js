import { Box, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, Route, Routes } from "react-router-dom"
import Style_ButtonAdd from "../style/Style_ButtonAdd"
import TebleOf_AddingClassOrEditingClass from "../tables/TebleOf_AddingClassOrEditingClass"
import TebleOf_DataOfTheClasses from "../tables/TebleOf_DataOfTheClasses"
import AddNewClass from "./AddNewClass"
import EditingClass from "./EditingClass"
import SmallContainer from "../SmallContainer"
import apiFunction from "../../functions/apiFunction"



export default function DataOfTheClasses() {
    let [classToEdit, setClassToEdit] = useState(null)
    let [rows, setRows] = useState([])

    let navigate = useNavigate();

    let sendSetClassToEdit = (data) => {
        setClassToEdit(data)
    }

    useEffect(() => {
        if (classToEdit) {
            navigate("addNewClass");
        }
    }, [classToEdit])

    // useEffect(() => {
    //     if (rows) {
    //         console.log("rows in D= ", rows);
    //     }
    // }, [rows])

    function updateEditClass(dataToServer) {
        console.log("dataToServer == ",dataToServer);
        apiFunction("admin/editClass", "PUT", dataToServer)
            .then(
                (data) => {
                    let dataFromServer = data;
                    console.log("dataFromServer = ", dataFromServer);
                    // צריך לעדכן ברשימת הכיתות את הכיתה שהתעדכנה
                    dataFromServer.numberOfStudents = dataFromServer.listStudents.length
                    setRows((e) => {
                        let copyListClass = [...e];
                        let index = copyListClass.findIndex(item => item._id == dataToServer._id);
                        copyListClass.splice(index, 1, dataFromServer);

                        // console.log("copyListClass = ", copyListClass);
                        return copyListClass
                    })
                    navigate("./")
                    if(classToEdit){
                        setClassToEdit(null);
                    }
                },
                (err) => {
                    console.log("Err from server = ", err.response.data);
                }
            )
    }
    return (
        <div className="DataOfTheClasses">

            {/* <SmallContainer containerStyle={{ m: 1, width: 550, minHeight: 500 }} paperStyle={{ "padding": '1rem' }}> */}
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
                {/* <Route path="/editClass" element={<EditingClass classToEdit={classToEdit} setClassToEdit={setClassToEdit} setRows={setRows} />} /> */}
                <Route path="/editClass" element={<h1>editClass</h1>} />
                <Route path='addNewClass' element={<AddNewClass updateEditClass={updateEditClass} classToEdit={classToEdit} setClassToEdit={setClassToEdit} setRows={setRows} />} />
            </Routes>
            {/* </SmallContainer> */}
        </div>
    )
}
