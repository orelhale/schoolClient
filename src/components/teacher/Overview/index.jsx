
import { useContext, useEffect, useState } from "react"
import GenericTable from "../../tables/GenericTable"
import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"
import DataContext from "../../../context/DataContext"
import ShowAverage from "../../components/ShowAverage"


export default function Overview() {

   let { classId, userData } = useContext(DataContext)

   let [switchWindow, setSwitchWindow] = useState("exam")

   let [examAverageList, setExamAverageList] = useState(null)
   let [attendanceAverageList, setAttendanceAverageList] = useState(null)

   useEffect(() => {
      apiFunction(`exams/average/${userData.id}/${classId}`, "GET")
      .then((examAverage) => {
         
         let chartData = []
         let labels = []
         
         examAverage.forEach(stu => {
            chartData.push(stu.average)
            labels.push(stu.studentName)
         });

         chartData.push(100)
         setExamAverageList({ chartData: chartData, labels: labels })
      })
   }, [])

   // useEffect(() => {
   //    if (examAverageList) {
   //       console.log("examAverageList ===== ",examAverageList);
   //    }
   // }, [examAverageList])

   // useEffect(() => {
   //    if (switchWindow) {
   //       console.log("switchWindow ===== ",switchWindow);
   //    }
   // }, [switchWindow])



   return (
      <div className={styles.overview}>
         <div>
            <button onClick={()=>setSwitchWindow("exam")}>exam</button>
            <button onClick={()=>setSwitchWindow("attendance")}>attendance</button>
         </div>

         <div className={styles.wrapAverageContainer2}>
            
            {switchWindow == "exam" &&
               <div className={styles.wrapAverageContainer}>
                  <ShowAverage
                     datasets={[{ chartData: examAverageList && examAverageList.chartData, datasetsTitle: "average" }]}
                     labels={examAverageList && examAverageList.labels}
                     chartTitle={"Exam average"}
                  />
               </div>
            }

            {switchWindow == "attendance" && <h1>Attendance average</h1>}
         </div>
      </div>
   )
}