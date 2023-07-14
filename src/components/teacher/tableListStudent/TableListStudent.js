import './TableListStudent.css'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import DateComponent from '../dateComponent/DateComponent';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import TebleOf_TableListStudent from '../../tables/TebleOf_TableListStudent';
import { Box, Button, Paper } from '@mui/material';
import Style_RoundButton from '../../style/Style_RoundButton';
import DataContext from '../../../context/DataContext';
import apiFunction from '../../../functions/apiFunction'


function TableListStudent(props) {
    let { classId, userData } = useContext(DataContext)

    let [funcOnClick, setFuncOnClick] = useState([])

    let [nameOfThisClass, setNameOfThisClass] = useState(classId);
    let [saveData, setSaveData] = useState(null);
    let [dataTable, setDataTable] = useState(null);

    let [listStudent , setListStudent] = useState([])
    const [value, setValue] = useState(new Date());
    const [dateAsMilliseconds , setDateAsMilliseconds] = useState(Date.now());


    let tableOptions = ["", "V", "X"]
    const [saveTheDataSelection, setSaveTheDataSelection] = useState("V");


    useEffect(() => {
        console.log("nameOfThisClass == ",nameOfThisClass);
        if (nameOfThisClass && value) {
            // אחרי שמתעדכן התאריך - הפונציה גורמת שיוצגו הנתונים של אותו תאריך מיד
            console.log("name calss = ", nameOfThisClass);
            getListStudentOfClass(nameOfThisClass)
        }
    }, [value, nameOfThisClass])


    useEffect(() => {
        if (dataTable) {
            let copyToFuncOnClick = []
            dataTable.listStudent.map((item, i) => {
                copyToFuncOnClick[i] = []
                saveData[i].map((item2, i2) => {
                    copyToFuncOnClick[i][i2] = () => {
                        if (saveData[i][i2] != saveTheDataSelection) {
                            let copySaveData = [...saveData]
                            copySaveData[i][i2] = saveTheDataSelection
                            setSaveData(copySaveData)
                        }
                    }
                })
            })
            console.log("copyToFuncOnClick = ", copyToFuncOnClick);
            setFuncOnClick(copyToFuncOnClick)
        }
    }, [saveTheDataSelection, dataTable])


    const handleChange = (newValue) => {
        setDataTable(null)
        setValue(newValue);
    };



    //****TODO: להעביר למקום אחר ולייבא את זה לפא
    let styleIcon = {
        "display": "inline-block",
        "width": "1.5rem",
        "height": "1.5rem",
        "display": "flex",
        "font-size": "1.5vw",
        "justify-content": "center",
        "align-items": "center",
    }

    function getIcon(icon) {
        return icon == "V" ? <DoneOutlinedIcon sx={styleIcon} /> : icon == "X" ? <CloseOutlinedIcon sx={styleIcon} /> : icon;
    }



    const checkIfHaveDataInSpecificDay = async (uId, cId, theyear,themonth, theday) => {

        // let objectToServer = {
        //     day: day,
        //     month: month,
        //     TeacherIdentification: `${userData.id}.${nameOfClass}`
        // }
        // console.log("objectToServer == ",objectToServer);
        // return new Promise(async (myResolve, myReject) => {
        //     let dataFromServer = await axios.post("http://localhost:4000/users/getDailyDataOfSpecificClass", objectToServer)
        //     myResolve(dataFromServer.data)
        // })
        return new Promise(async (myResolve, myReject) => {
            let dataFromServer = await apiFunction(`dailydatas/specific/${uId}/${cId}/${theyear}/${themonth}/${theday}`)
            myResolve(dataFromServer)
        })



    }



    const getListStudentOfClass = (nameOfClass) => {

        setNameOfThisClass(nameOfClass)
        
        // axios.post("http://localhost:4000/users/GetListOfStudentsInSpecificClasses", { nameOfClass: nameOfClass })
            apiFunction(`classes/${classId}`,"GET")
            .then(async (data) => {
                let obj = {}
                // obj.listStudent = data.data
                setListStudent(data.listStudents)
                obj.listStudent = data.listStudents.map(stu => stu.nameStudent)

                console.log("data.data = ", data);
                obj.list = ["attendance"]
                
                let date = new Date(value)
                let day = date.getDate() - 1
                let month = date.getMonth()
                let year = date.getFullYear()
                
                let dataFromServer = await checkIfHaveDataInSpecificDay(userData.id, classId, year,month,day)
                // let dataFromServer = await checkIfHaveDataInSpecificDay(nameOfClass)
                
                console.log("dataFromServer = ", dataFromServer);
                // console.log("dataFromServer ==== ",dataFromServer);
                let arr = []

                if (dataFromServer == "") {
                    for (let i = 0; i < obj.listStudent.length; i++) {
                        arr[i] = []

                        for (let i2 = 0; i2 < obj.list.length; i2++) {
                            arr[i][i2] = ""
                        }
                    }

                } else {
                    arr = []

                    data.listStudents.forEach(({nameStudent, _id}, i) =>{
                        // console.log("stu == ",nameStudent);
                        let sName = nameStudent
                        let attendance = dataFromServer.list.find(s => s.studentId == _id).attendance || ""
                        // console.log("_id == ",_id);
                        // console.log("dataFromServer == ",dataFromServer);
                        // console.log("attendance == ",attendance);
                        arr[i] = [{attendance: attendance,nameStudent:sName}]

                    })
                }
                console.log("arr ==== ",arr);
                setSaveData(arr)
                setDataTable(obj)
            })
    }

    const organizationOfInformation = ()=>{

    }

    const completed = () => {
        console.log("dataTable == ",dataTable);
        console.log("saveData == ",saveData);
        console.log("listStudent == ",listStudent);
        let attendanceList = []
        listStudent.forEach(({_id}, i) => {
            attendanceList.push({ studentId: _id, [dataTable.list[0]]: saveData[i][0] })
        });

        // let objectToServer = {
        //     TeacherIdentification: `${userData.id}.${nameOfThisClass}`,
        //     dataForSave: dataForDatabase,
        //     month: new Date(value).getMonth(),
        //     day: new Date(value).getDate() - 1,
        // }

        let date = new Date(value)
        let day = date.getDate() - 1
        let month = date.getMonth()
        let year = date.getFullYear()


        let dataToServer = {
            teacherId: userData.id,
            classId: classId,
            professionId: "",
            year: year,
            dailyDataList: [{day: day, list: attendanceList}],
            month: month
        }

        console.log("dataToServer = ", dataToServer);
        // axios.put("http://localhost:4000/users/addNewDailyData", objectToServer)

        apiFunction(`dailydatas/`, "POST", dataToServer)
            .then(
                (data) => { console.log(data); },
                (err) => {
                    alert(`Err: status = ${err.response.status}`)
                }
            )
    }








    return (
        <div className='TableListStudent'>
            {dataTable &&
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        "justifyContent": 'center',
                        '& > :not(style)': {
                            m: 1,
                            width: 550,
                            minHeight: 500,
                            padding: 3
                        },
                    }}
                >
                    <Paper elevation={3} sx={{ "padding": '1rem 0rem' }}>
                        <div className='containerTableListStudent myFlexColumnAlineCenter'>

                            <DateComponent value={value} handleChange={handleChange} setValue={setValue} />

                            <br />

                            <div className='myFlexRowAlineSpaceAround' style={{ width: "100%" }}>

                                <div className='myPositionAbsolute'>
                                    <div className="divSelectData" >
                                        {tableOptions.map((e) => {
                                            return (

                                                <Style_RoundButton onClick={() => { setSaveTheDataSelection(e) }} styleB={saveTheDataSelection == e ? "r" : "b"} bodyButton={getIcon(e)} />


                                                // <div className={saveTheDataSelection == e ? "selectedData": "dataNotSelected" }onClick={()=>{
                                                //     setSaveTheDataSelection(e)
                                                // }}>{getIcon(e)}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <TebleOf_TableListStudent saveData={saveData} dataTable={dataTable} funcOnClick={funcOnClick} />
                            </div>
                            <br />
                            <Button variant="outlined" onClick={completed}>save</Button>
                        </div>
                    </Paper>
                </Box>
            }
        </div>
    )
}


export default TableListStudent