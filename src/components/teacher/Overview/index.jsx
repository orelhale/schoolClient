
import { useContext, useEffect, useState } from "react"
import { Route, Router, Routes, useLocation, useNavigate } from "react-router-dom"
import GenericTable from "../../tables/GenericTable"
import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"
import DataContext from "../../../context/DataContext"
import ShowAverage from "../../components/ShowAverageTable"
import ShowAveragePie from "../../components/ShowAveragePie"
import globalElement from "../../../globalStyle/globalElement.module.css"

export default function Overview() {

   let { classId, userData, studentOverview, setStudentOverview } = useContext(DataContext)
   let navigate = useNavigate()

   let location = useLocation()

   let [switchWindow, setSwitchWindow] = useState("Exam")

   let [examAverageList, setExamAverageList] = useState(null)
   let [attendanceAverageList, setAttendanceAverageList] = useState(null)
   let [studentDate, setStudentDate] = useState(null)

   let list = ["studentName", "present", "absent"]
   let titleListWithColor = [{ color: "Green", title: "present" }, { color: "Red", title: "absent" }]

   let backgroundColorList = {
      'Red': 'rgba(255, 99, 132, 0.2)',
      'Blue': 'rgba(54, 162, 235, 0.2)',
      'Yellow': 'rgba(255, 206, 86, 0.2)',
      'Green': 'rgba(75, 192, 192, 0.2)',
      'Purple': 'rgba(153, 102, 255, 0.2)',
      'Orange': 'rgba(255, 159, 64, 0.2)',
   }

   let borderColorList = {
      'Red': 'rgba(255, 99, 132, 1)',
      'Blue': 'rgba(54, 162, 235, 1)',
      'Yellow': 'rgba(255, 206, 86, 1)',
      'Green': 'rgba(75, 192, 192, 1)',
      'Purple': 'rgba(153, 102, 255, 1)',
      'Orange': 'rgba(255, 159, 64, 1)',
   }

   // useEffect(() => {
   //    console.log("location == ",location.pathname);
   // }, [location])

   useEffect(() => {
      console.log("location == ", location.pathname);
      if (studentOverview) {
         setStudentOverview(null)
      }
      if (location.pathname == "/teacher/overview" || location.pathname == "/teacher/overview/exam") {
         if (!examAverageList)
            getExamsAverage()

      }
      if (location.pathname == "/teacher/overview/attendance") {
         if (!attendanceAverageList)
            getAttendanceAverage()
      }
   }, [location.pathname])

   useEffect(() => {
      if (examAverageList) {
         console.log("examAverageList ===== ", examAverageList);
      }
   }, [examAverageList])

   useEffect(() => {
      if (attendanceAverageList) {
         console.log("attendanceAverageList ===== ", attendanceAverageList);
      }
   }, [attendanceAverageList])


   async function getExamsAverage() {
      apiFunction(`exams/average/${userData.id}/${classId}`, "GET")
         .then((examAverage) => {
            let chartData = []
            let labels = []

            examAverage.forEach(stu => {
               chartData.push(stu.average)
               labels.push(stu.studentName)
            });

            chartData.push(100)
            console.log("chartData == ", chartData);
            setExamAverageList({ chartData: chartData, labels: labels })
            navigate("../overview/exam")
         })
   }


   async function getAttendanceAverage() {
      apiFunction(`dailydatas/average/${userData.id}/${classId}`, "GET")
         .then((attendanceAverage) => {
            console.log("attendanceAverage == ",attendanceAverage);
            setAttendanceAverageList(attendanceAverage)
            // let listStudentId = attendanceAverage.averageList.map(stu =>stu.studentId)
            // apiFunction(`students/list`, "POST",{listStudentId:listStudentId})
            // .then((listNameStudent) => {
            //    console.log("listNameStudent 44 ==== ",listNameStudent);
            // })


            // console.log("listStudentId == ",listStudentId);
            navigate("../overview/attendance")
         })
   }

   async function showStudentOverview(studentData) {
      // console.log("studentData == ", studentData);
      setStudentOverview(studentData)
      if (location.pathname == "/teacher/overview/exam") {
         navigate("specific/exam")
      }
      if (location.pathname == "/teacher/overview/attendance") {
         navigate("specific/attendance")
      }
   }
   function getBlockColorElement(color) {
      return <span className={styles.titleColor} style={{ borderColor: borderColorList[color], backgroundColor: backgroundColorList[color] }}></span>
   }
   return (
      <div className={styles.overview}>

         <div className={styles.wrapButton}>
            <button className={globalElement.button} onClick={() => navigate("../overview/exam")}>Exam</button>
            <button className={globalElement.button} onClick={() => navigate("../overview/attendance")}>Attendance</button>
         </div>

         <div className={styles.wrapAverageContainer2}>

            <Routes>
               <Route path='exam' element={<>
                  {examAverageList &&
                     <div className={styles.wrapAverageContainer}>
                        <h2>Exam average</h2>
                        <br />


                        {(() => { let c = 0; examAverageList.chartData.forEach(s => c += s); return `${Math.round(((c - 100) / ((examAverageList.chartData.length * 100) - 100)) * 100)}%` })()}
                        <br />
                        <br />
                        {/* <ShowAveragePie
                           // datasets={[{ chartData: (examAverageList && examAverageList.chartData)? (()=>{let c = 0; examAverageList.chartData.forEach(s=>c+= s); return [c - 100,(examAverageList.chartData.length *100)-100]})() :[5,5] , datasetsTitle: "average", colors: ['Green', 'Red'] }]}
                           datasets={[{ chartData: [80,100] , datasetsTitle: "average", colors: ['Green', 'Red'] }]}
                           // datasets={[{ chartData: examAverageList && examAverageList.chartData, datasetsTitle: "average" }]}
                           chartTitle={""}
                           labels={['present', "absent"]}
                        /> */}
                        <ShowAverage
                           datasets={[{ chartData: examAverageList && examAverageList.chartData, datasetsTitle: "average" }]}
                           chartTitle={"Exam average"}
                           labels={examAverageList && examAverageList.labels}
                        />
                     </div>
                  }
               </>} />
               <Route path='attendance' element={<>
                  {attendanceAverageList &&

                     <div className={styles.aline}>
                        <h2>Attendance average</h2>

                        <br />
                        <br />
                        {/* <br /> */}
                        <div className={styles.wrapListTitle}>
                           {titleListWithColor.map(({ title, color }) => <spen className={styles.wrapListTitle2}><div className={styles.titleName}>{title}</div>{getBlockColorElement(color)}</spen>)}
                        </div>
                        <div className={styles.pieWrap}>
                           {attendanceAverageList.averageList.map(stu =>
                              <div className={styles.wrapPieItem2}>
                                 {console.log("stu == ", stu)}
                                 <div className={styles.wrapPieItem} onClick={() => { showStudentOverview(stu) }}>
                                    <div className={`${styles.aline} ${styles.flex_gap_5}`}>
                                       <span className={`${styles.alineRow} ${styles.flex_gap_5}`}>{`${stu.studentName} ${stu.family}`}</span>
                                       <span className={`${styles.alineRow} ${styles.flex_gap_5}`}>{getBlockColorElement("Red")}{stu.absent} </span>
                                       <span className={`${styles.alineRow} ${styles.flex_gap_5}`}>{getBlockColorElement("Green")}{stu.present} </span>
                                    </div>

                                    <div className={styles.pieItem}>
                                       <ShowAveragePie
                                          datasets={[{ chartData: [stu.present, stu.absent], datasetsTitle: "average", colors: ['Green', 'Red'] }]}
                                          // datasets={[{ chartData: examAverageList && examAverageList.chartData, datasetsTitle: "average" }]}
                                          chartTitle={""}
                                          labels={['present', "absent"]}
                                       />
                                    </div>
                                 </div>

                              </div>
                           )
                           }
                        </div>
                        <table className={styles.table}>
                           <tr className={styles.tr}>
                              {list.map(header => <th className={styles.th}>{header}</th>)}
                           </tr>
                           {attendanceAverageList.averageList.map(row =>
                              <tr className={styles.tr}>
                                 {list.map((key, i) => <td className={styles.td}>{key == "note" ? (row[key].length) : row[key]}</td>)}
                              </tr>
                           )}
                        </table>
                     </div>
                  }
               </>} />
            </Routes>


            {/* {switchWindow == "Attendance" && attendanceAverageList &&

            } */}
         </div>
      </div>
   )
}