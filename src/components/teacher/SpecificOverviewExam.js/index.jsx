
import { useContext, useEffect, useState } from "react"
import GenericTable from "../../tables/GenericTable"
import { useNavigate } from "react-router-dom"

import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"
import DataContext from "../../../context/DataContext"
import ShowAverage from "../../components/ShowAverageTable"
import ShowAveragePie from "../../components/ShowAveragePie"
import globalElement from "../../../globalStyle/globalElement.module.css"
import Style_BackButton from "../../buttons/Style_BackButton"

export default function SpecificOverviewExam() {
   let { classId, userData, studentOverview, setStudentOverview } = useContext(DataContext)
   let navigate = useNavigate()

   useEffect(()=>{
      if(!studentOverview){
         navigate("/teacher/overview/exam")
      }
   },[studentOverview])

   return (
      <div className={styles.SpecificOverviewExam}>
         <Style_BackButton text={"Overview"} onClick={() => { navigate("/teacher/overview/exam") }}/>
         Exam
      </div>
   )
}