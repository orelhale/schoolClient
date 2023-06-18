import { useEffect, useState, Fragment } from 'react';

import { Avatar, Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function GenericTableWithData({ rows = [], columns = [], setRows, sendSetClassToEdit, titleData = "" }) {
   let [listRows, setListRows] = useState([])
   useEffect(() => {
      if (rows[0]) {
         console.log(" ============ ",columns);
         setListRows(rows)
      }
   }, [rows])


   let refreshStateAfterDaleteClass = (index_thisRow) => {
      let copyRows = [...rows]
      copyRows.splice(index_thisRow, 1)
      setRows(copyRows)
   }


   return (<>
      {listRows[0] &&
         <TableContainer component={Paper}>
            <Table aria-label="collapsible table" >
               <TableHead>
                  <TableRow>
                     <TableCell />
                     {/* <TableCell>Class name</TableCell>
                     <TableCell >Number of students</TableCell> */}
                     {columns.map(item => {
                        <TableCell>{item.label}</TableCell>
                     })}
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {listRows.map((row, index_thisRow) => (
                     <Row key={row.id} row={row} columns={columns} refreshStateAfterDaleteClass={() => { return refreshStateAfterDaleteClass(index_thisRow) }} funcEditClass={() => {
                        // sendSetClassToEdit(row)
                     }} />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      }
   </>
   );
}



function Row(props, columns, titleData) {
   const { row, funcEditClass, refreshStateAfterDaleteClass } = props;

   const [open, setOpen] = useState(false);


   let deleteClassAndHisStudent = (classToDelete) => {
      // console.log("classToDelete = ", classToDelete);
      // axios.delete(`http://localhost:4000/admin/deleteClassAndAllHisStudents?classToDelete=${classToDelete}`)
      //    .then(
      //       (data) => {
      //          // console.log("Data from server = ",data.data)
      //          refreshStateAfterDaleteClass()
      //       },
      //       (err) => { console.log("err in deleteClassAndAllHisStudents") }
      //    )
   }


   return (
      <Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            {/* תוכן השורות - עבור שמירת כיתות */}
            <TableCell>
               <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
               >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
               </IconButton>
            </TableCell>
            {/* {columns.map(item => {
               <TableCell>{item.label}</TableCell>
            })} */}
            {/* <TableCell>{row.numberOfStudents}</TableCell>
            <TableCell component="th" scope="row">{row.nameOfClass}</TableCell> */}


            {/* מחזיק את האייקונים- עריכה ומחיקה */}
            <TableCell sx={{ display: "flex" }}>
               {/* אייקון עפרון - עריכת כיתה */}
               <Avatar sx={{ height: "2.2rem", width: "2.2rem", backgroundColor: "#912eff" }}>
                  <EditIcon onClick={() => { funcEditClass() }} />
               </Avatar>
               <p>dsfsdfds</p>
               {console.log("columns= ",columns)}
               {/* {columns.map(({title}) => row[title])} */}
               {/* אייקון פח אשפה - מוחק כיתה */}
               {/* <IconButton sx={{ padding: "0rem" }} onClick={() => { deleteClassAndHisStudent(row._id) }}>
                  <DeleteIcon sx={{ fontSize: "2rem" }} color="error" />
               </IconButton> */}
            </TableCell>
            {/* תוכן השורות - עבור שמירת כיתות */}
         </TableRow>

         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: "0.2rem 2rem" }}>

                     <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 500 }}>
                        {titleData}
                     </Typography>
                     {/* תוכן השורות - עבור רשימת תלמידים */}
                     <Table size="small" aria-label="purchases">
                        {/* <TableHead>
                           <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                           </TableRow>
                        </TableHead> */}

                        <TableBody >
                           <p>dsfsdfsf</p>
                           {/* {row.data.map((dataItem) => (

                              <TableRow>
                                 <TableCell component="th" scope="row">{dataItem}</TableCell>
                              </TableRow>
                           ))} */}
                        </TableBody>

                     </Table>
                     {/* תוכן השורות - עבור רשימת תלמידים */}
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>

      </Fragment>
   );
}


