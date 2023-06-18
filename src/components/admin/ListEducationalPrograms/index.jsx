
import { useEffect, useState } from "react"
import GenericTable from "../../tables/GenericTable"
import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"


export default function ListEducationalPrograms() {
   let [listPrograms, setListPrograms] = useState([])
   let [sizePrograms, setSizePrograms] = useState(5)

   useEffect(() => {
      let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=b04578f3-2ece-47ce-a457-66a00a9d1eac&limit=${sizePrograms}`
      axios.get(url)
         .then((data) => {
            let result = data.data.result.records

            let listRows = result.map(item => {
               let { _id, shemTochnit, statusTochnit, shemIrgun } = item
               return { _id, shemTochnit, statusTochnit, shemIrgun, data: [] }
            })
            setListPrograms(listRows)
         })
   }, [])

   useEffect(() => {
      if (listPrograms) {
         console.log("listPrograms = ", listPrograms);
      }
   }, [listPrograms])

   const styleAllColumns = { fontWeight: 750, alignItems: "left", backgroundColor: "#1976d2", color: "#FFF" };
   const styleAllRows = { paddingLeft: "15px" };

   const columns = [
      {
         id: '_id',
         label: '#',
         styleColumn: { minWidth: 10 },
         styleRow: { minWidth: 10, padding: "16px 0px" }
      },
      {
         id: 'shemTochnit',
         label: 'שם תוכנית',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      {
         id: 'statusTochnit',
         label: 'סטטוס',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      {
         id: 'shemIrgun',
         label: 'ארגון',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
   ]

   return (
      <div className={styles.ListEducationalPrograms}>
         {listPrograms[0] &&
            <GenericTable
               columns={columns}
               dataRows={listPrograms}
               styleAllColumns={styleAllColumns}
               styleAllRows={styleAllRows}
            />}

         <GenericTableWithData rows={listPrograms} columns={columns} setRows={setListPrograms} />
      </div>
   )
}