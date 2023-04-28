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


function GenericTable({ columns, dataRows, styleAllColumns, icons, styleContainerTable, styleTable, styleAllRows, }) {

   const [rows, setRows] = useState(dataRows);

   useEffect(() => {
      if (dataRows) {
         setRows(dataRows)
      }
   }, [dataRows])

   return (
      <>{columns &&
         <Paper sx={styleContainerTable} >
            <TableContainer>
               <Table stickyHeader aria-label="sticky table" sx={styleTable}>
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => {
                           return <TableCell key={column.id} sx={column.styleColumn ? { ...column.styleColumn, ...styleAllColumns } : styleAllColumns}>{column.label}</TableCell>
                        })}
                     </TableRow>
                  </TableHead>
                  {rows &&
                     <TableBody>
                        {rows.map((row, index_row) => {
                           return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={index_row} >
                                 {columns.map((column, index_column) => {
                                    const value = row[column.id];
                                    return (
                                       <TableCell key={column.id} sx={column.styleRow ? { ...column.styleRow, ...styleAllRows } : styleAllRows}>
                                          {column.label == "icon" && icons ? icons(row, value) : value}
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