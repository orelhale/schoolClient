
import { useContext, useEffect, useState } from "react"
import GenericTable from "../../tables/GenericTable"
import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"
import DataContext from "../../../context/DataContext"
import ShowAverage from "../../components/ShowAverageTable"
import ShowAveragePie from "../../components/ShowAveragePie"
import globalElement from "../../../globalStyle/globalElement.module.css"
import { useNavigate } from "react-router-dom"
import Style_BackButton from "../../buttons/Style_BackButton"
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

export default function SpecificOverviewAttendance() {
   let { classId, userData, studentOverview, setStudentOverview } = useContext(DataContext)
   let navigate = useNavigate()
   let [rowData, setrowData] = useState([])
   function getIcon(icon) {
      return icon == "V" ? <DoneOutlinedIcon sx={styleIcon} /> : icon == "X" ? <CloseOutlinedIcon sx={styleIcon} /> : icon;
  }
  let styleIcon = {
   "display": "inline-block",
   "width": "1.5rem",
   "height": "1.5rem",
   "display": "flex",
   "font-size": "1.5vw",
   "justify-content": "center",
   "align-items": "center",
}

   useEffect(() => {
      if (!studentOverview){
         navigate("/teacher/overview/attendance")
      }else{
         // console.log("studentOverview == ",studentOverview.attendanceData);
         let arr = studentOverview.attendanceData.map(({attendance, date})=>({attendance: getIcon(attendance), date:`${date.year}/${date.month}/${date.day}`}))
         arr.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
         // console.log("arr == ",arr);
         setrowData(arr)
      }
   }, [studentOverview])

   const styleContainerTable = { maxWidth: "100%", overflow: 'hidden' };
   const styleAllColumns = { fontWeight: 750 };
   const columns = [
      {
         id: '#',
         label: '#',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      {
         id: 'attendance',
         label: 'Attendance',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      {
         id: 'date',
         label: 'Date',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      
   ]

   return (
      <div className={styles.SpecificOverviewAttendance}>
         <Style_BackButton text={"Overview"} onClick={() => { navigate("/teacher/overview/attendance") }} />
         <br />
         <br />
         <br />
         <div>
            {studentOverview && <GenericTable
               defultStyleHeaders={true}
               columns={columns}
               dataRows={rowData}
               styleContainerTable={styleContainerTable}
               styleAllColumns={styleAllColumns}
            />}
         </div>
      </div>
   )
}