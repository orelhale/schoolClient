

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';


// arr.splice(4, 1)

export default function TebleOf_AddingClassOrEditingClass(props) {

  const [rows, setRows] = React.useState([]);

  const columns = [
    { id: 'index', label: '#', minWidth: 20 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'identify', label: 'Identify', minWidth: 100 },
  ];

  let funcRemoveItem = (index)=>{
    let copyArr = [...props.studentsList]
    copyArr.splice(index, 1)
    props.setStudentsList(copyArr)
  }

  React.useEffect(()=>{
    if(props.studentsList){
        let tempData = props.studentsList
        let arr = tempData.map((item, i)=>{
            return { index: `${i + 1}.`, name: item.nameStudent , identify: item.identify}
        })

        setRows(arr)
    }
  },[props.studentsList])




  // let style1 = { fontWeight: 700, "font-size": "1.4rem", "width": "15%" }
	// let style2 = { fontWeight: 700, "font-size": "1.4rem"}
  // sx={{fontWeight: 700}}

  return (
    <Paper sx={{ "width": '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 700 }} >{column.label} </TableCell>
              ))}
              <TableCell key={"null"} sx={{minWidth: 10}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, index_row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{fontWeight: 500}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                     <TableCell key={index_row + "d"}> <IconButton onClick={()=>{funcRemoveItem(index_row)}}><DeleteIcon color="error" /></IconButton> </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}





