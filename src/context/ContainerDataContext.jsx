
import { useState } from "react";
import DataContext from "./DataContext";

export default function ContainerDataContext({children}) {

   let [examDate , setExamDate] = useState(null)

   let value = {
      examDate , 
      setExamDate,
   }

   return(
      <DataContext.Provider value={value}>
         {children}
      </DataContext.Provider>
   )
}