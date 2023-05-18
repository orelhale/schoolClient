
import { useState } from "react";
import DataContext from "./DataContext";

export default function ContainerDataContext({ children }) {

   let [examDate, setExamDate] = useState(null)
   let [userData, setUserData] = useState(null)
   let [classId, setClassId] = useState(null)

   let value = {
      examDate,
      setExamDate,
      userData,
      setUserData,
      classId, 
      setClassId,
   }

	// let { examDate, setExamDate, classId, setClassId, setUserData, userData } = useContext(DataContext)

   return (
      <DataContext.Provider value={value}>
         {children}
      </DataContext.Provider>
   )
}