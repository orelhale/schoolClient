import './TableListStudent.css'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import DateComponent from '../dateComponent/DateComponent';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useNavigate } from 'react-router-dom';
import TebleOf_TableListStudent from '../../tables/TebleOf_TableListStudent';
import { UserContext } from "../../../App"
import { NameOfClassContext } from "../Teacher"
import { Avatar, Box, Button, Paper } from '@mui/material';
import Style_RoundButton from '../../style/Style_RoundButton';


function TableListStudent(props) {
    const useContext_ValueUserContext = useContext(UserContext);
    const useContext_NameOfClassContext = useContext(NameOfClassContext);

    let [funcOnClick,setFuncOnClick] =  useState([])

    let [dataAboutUser, setDataAboutUser] = useState(useContext_ValueUserContext.dataOfUser);
    let [nameOfThisClass, setNameOfThisClass] = useState(useContext_NameOfClassContext);
    let [saveData, setSaveData] = useState(null);
    let [dataTable, setDataTable] = useState(null);
    const [value, setValue] = useState(new Date());

    let navigate = useNavigate()

    let tableOptions = ["","V","X"]
    const [saveTheDataSelection, setSaveTheDataSelection] = useState("V");
    


    useEffect(()=>{
        if(dataTable){

            let copyToFuncOnClick = []
            dataTable.listStudent.map((item,i)=>{
                copyToFuncOnClick[i] = []
                saveData[i].map((item2, i2)=>{
                    copyToFuncOnClick[i][i2]= ()=>{
                        if(saveData[i][i2] != saveTheDataSelection){
                            let copySaveData = [...saveData]
                            copySaveData[i][i2] = saveTheDataSelection
                            setSaveData(copySaveData)
                        }
                    } 
                })
            })
            console.log("copyToFuncOnClick = ",copyToFuncOnClick    );
            setFuncOnClick(copyToFuncOnClick)
        }
    },[saveTheDataSelection, dataTable])


    const handleChange = (newValue) => {
        setDataTable(null)
        setValue(newValue);
    };

  

    //****TODO: להעביר למקום אחר ולייבא את זה לפא
    let styleIcon = {
        "display": "inline-block",
        "width": "1.5rem",
        "height": "1.5rem",
        "display":  "flex",
        "font-size": "1.5vw",
        "justify-content": "center",
        "align-items": "center",
    }

    function getIcon(icon) {
        return icon == "V" ? <DoneOutlinedIcon sx={styleIcon}/> : icon == "X" ? <CloseOutlinedIcon sx={styleIcon}/> : icon;
    }

    

    const checkIfHaveDataInSpecificDay = async(nameOfClass)=>{
        let date = new Date(value)
        let day = date.getDate()-1
        let month = date.getMonth()
        
        let objectToServer = {
            day: day,
            month: month,
            TeacherIdentification: `${dataAboutUser.id}.${nameOfClass}`
        }
        
        return new Promise(async(myResolve, myReject)=> {
            let dataFromServer = await axios.post("http://localhost:4000/users/getDailyDataOfSpecificClass", objectToServer)
            myResolve(dataFromServer.data)
        })
    }



    const getListStudentOfClass = (nameOfClass)=>{
        
        setNameOfThisClass(nameOfClass)
        axios.post("http://localhost:4000/users/GetListOfStudentsInSpecificClasses",{nameOfClass: nameOfClass})
        .then( async(data)=>{
            let obj = {}
            obj.listStudent = data.data
            console.log("data.data = ",data.data);
            obj.list = ["נוכחות"]
            let dataFromServer = await checkIfHaveDataInSpecificDay(nameOfClass)
            

            let arr = []

            if(dataFromServer == ""){
                for (let i = 0; i < obj.listStudent.length; i++) {
                    arr[i] = []
        
                    for (let i2 = 0; i2 < obj.list.length; i2++) {
                        arr[i][i2] = ""
                    }
                }

            }else{
                for (let i = 0; i < obj.listStudent.length; i++) {
                    arr[i] = []
                    for (let i2 = 0; i2 < obj.list.length; i2++) {
                        //****TODO - לבדוק אם השם של התלמיד נמצא ברשימה - אחרת הנתון יהיה ריק
                        //****TODO - נועד למנוע מקרה כאשר נוסף תלמיד חדש של היה כאשר הכניסו נתונים למסד נתונים
                        arr[i][i2] = dataFromServer.data[i][obj.list[i2]]
                    }
                }
            }
            setSaveData(arr)
            setDataTable(obj)
        })
    }



    const completed = ()=>{
        let dataForDatabase = []
        dataTable.listStudent.forEach((element, i)=> {
            dataForDatabase.push({nameStudent: element, [dataTable.list[0]]: saveData[i][0]})
        });

        let objectToServer = {
            TeacherIdentification: `${dataAboutUser.id}.${nameOfThisClass}`,
            dataForSave: dataForDatabase,
            month: new Date(value).getMonth(),
            day: new Date(value).getDate()-1,
        }

        console.log("objectToServer = ",objectToServer);
        axios.put("http://localhost:4000/users/addNewDailyData", objectToServer)
            .then(
                (data)=>{console.log(data);},
                (err)=>{
                alert(`Err: status = ${err.response.status}`)
                }
            )
        ;
    }


    useEffect(()=>{
        console.log(nameOfThisClass);
        if(nameOfThisClass && value){
            // אחרי שמתעדכן התאריך - הפונציה גורמת שיוצגו הנתונים של אותו תאריך מיד
            console.log("name calss = ",nameOfThisClass);
            getListStudentOfClass(nameOfThisClass)
        }
    },[value,nameOfThisClass])







    return(
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
                          <Paper elevation={3} sx={{"padding": '1rem 0rem'}}>
                    <div className='containerTableListStudent myFlexColumnAlineCenter'>
                        
                        <DateComponent value={value} handleChange={handleChange} setValue={setValue} />

                        <br />       

                        <div className='myFlexRowAlineSpaceAround' style={{width: "100%"}}>

                            <div className='myPositionAbsolute'>
                                <div className="divSelectData" >
                                    {tableOptions.map((e)=>{
                                        return (
                                      
                                                    <Style_RoundButton onClick={()=>{setSaveTheDataSelection(e)}} styleB={saveTheDataSelection == e ? "r": "b"} bodyButton={getIcon(e)}/>
                                   

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