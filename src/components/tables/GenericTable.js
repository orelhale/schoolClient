import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MyIcon_Edit from '../myIcons/MyIcon_Edit';
import MyIcon_Delete from '../myIcons/MyIcon_Delete';
import { useEffect, useState } from 'react';


function GenericTable({ columns, dataRows, styleAllColumns,styleAllHeaders, icons, styleContainerTable, styleTable, styleAllRows, defultStyleHeaders, defultStyleColumns }) {
   
   const setDefultStyleHeaders = { fontWeight: 750, alignItems: "left", backgroundColor: "#1976d2", color: "#FFF" };
   const setDefultStyleColumns = { fontWeight: 750 };
   
   const [rows, setRows] = useState(null);

   useEffect(() => {
      if (dataRows) {
         setRows(dataRows)
      }
   }, [dataRows, columns])

   return (
      <>{columns && rows &&
         <Paper sx={styleContainerTable} >
            <TableContainer>
               <Table stickyHeader aria-label="sticky table" sx={styleTable}>
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => {
                           return <TableCell key={column.id} sx={column.styleColumn ? { ...column.styleColumn, ...(defultStyleHeaders && setDefultStyleHeaders),...styleAllHeaders } : {...styleAllColumns,...(defultStyleColumns&& setDefultStyleColumns)}}>{column.label != "icon" && column.label != "#" && column.label}</TableCell>
                        })}
                     </TableRow>
                  </TableHead>
                  {rows && rows[0] &&
                     <TableBody>
                        {rows.map((row, index_row) => {
                           // {console.log("row == ",row);}
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={index_row} sx={{...styleAllColumns,...(defultStyleColumns&& setDefultStyleColumns)}} >
                                 {columns.map((column, index_column) => {
                                    const value = row[column.id];
                                    return (
                                       <TableCell key={column.id} sx={column.styleRow ? {  ...styleAllRows,...column.styleRow } : styleAllRows}>
                                          {column.label == "icon" && icons ? icons(row, value, index_row) : column.label == "#" && column.id == "#" ? (index_row +1 +" ."): value}
                                       </TableCell>
                                    );
                                 })}
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  }
               </Table>
            </TableContainer>
         </Paper>
      }</>
   )
}

export default GenericTable;