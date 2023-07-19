
import { useEffect, useState } from "react"
import GenericTable from "../../tables/GenericTable"
import styles from "./style.module.css"
import apiFunction from "../../../functions/apiFunction"
import axios from "axios"
import GenericTableWithData from "../../tables/GenericTableWithData"
import GenericTableWithOpenArrows from "../../tables/GenericTableWithOpenArrows"
import { Pagination } from "@mui/material"


export default function ListEducationalPrograms() {
   let [listPrograms, setListPrograms] = useState([])
   // let [information, setListPrograms] = useState([])
   let [sizePrograms, setSizePrograms] = useState(5)
   let [page, setPage] = useState(1)

   useEffect(() => {
      let url = `https://data.gov.il/api/3/action/datastore_search?resource_id=b04578f3-2ece-47ce-a457-66a00a9d1eac&limit`
      axios.get(url)
         .then((data) => {
            let result = data.data.result.records
            // console.log("result = ", result);
            let listRows = result.map(item => {

               let { _id, shemTochnit, statusTochnit, shemIrgun, makorTochnit, mataratTochnit, taktsirTochnit } = item
               return { _id, shemTochnit, statusTochnit, shemIrgun, makorTochnit, data: [], mataratTochnit, taktsirTochnit }
            })
            setListPrograms(listRows)
         })
   }, [])

   // useEffect(() => {
   //    if (listPrograms) {
   //       console.log("listPrograms = ", listPrograms);
   //    }
   // }, [listPrograms])

   const styleAllHeaders = { fontWeight: 750, alignItems: "left", backgroundColor: "#1976d2", color: "#FFF" };
   const styleAllColumns = { fontWeight: 750 };
   const styleAllRows = { paddingLeft: "15px" };

   const columns = [
      {
         id: '_id',
         label: '',
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
      {
         id: 'makorTochnit',
         label: 'מקור תוכנית',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
      // {
      //    id: 'mataratTochnit',
      //    label: 'none',
      //    styleColumn: { minWidth: 140 },
      //    styleRow: { minWidth: 140 }
      // },
      {
         id: 'taktsirTochnit',
         label: 'none',
         styleColumn: { minWidth: 140 },
         styleRow: { minWidth: 140 }
      },
   ]

   return (
      <div className={styles.ListEducationalPrograms}>
         <h1>:רשימת תוכניות חינוכיות מאת משרד החינוך</h1>
         <br />
         <br />
         {/* {listPrograms[0] &&
            <GenericTable
               columns={columns}
               dataRows={listPrograms}
               styleAllColumns={styleAllColumns}
               styleAllHeaders={styleAllHeaders}
               styleAllRows={styleAllRows}
            />}
            <br />
            <br />
            <br /> */}
         {/* <GenericTableWithData rows={listPrograms} columns={columns} setRows={setListPrograms} /> */}
         <GenericTableWithOpenArrows styleAllHeaders={styleAllHeaders} rowData={listPrograms.slice(((page * sizePrograms) - sizePrograms), (page * sizePrograms))} columns={columns} setRows={setListPrograms} />
         <div className={styles.pagination}>
            <Pagination color="primary" count={Math.ceil(listPrograms.length / sizePrograms)} onChange={(e, v) => setPage(v)} />
         </div>

      </div>
   )
}