import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box } from '@mui/system';


const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'value', label: 'נוכחות', minWidth: 100 },
  // { id: '22', label: 'בדיקה', minWidth: 100 },
  
];

function createData(name, value) {
  return { name, value};
}

export default function TebleOf_TableListStudent(props) {
  // let [funcOnClick,setFuncOnClick] = React.useState([])
  let [copySaveTheDataSelection,setCopySaveTheDataSelection] = React.useState(props.saveTheDataSelection)
  let styleIcon = {
        "display": "inline-block",
        "width": "1.5rem",
        "height": "1.5rem",
        "display":  "flex",
        // "font-size": "20px",
        "justify-content": "center",
        "align-items": "center",
    }


    function getIcon(icon) {
        return icon == "V" ? <DoneOutlinedIcon sx={styleIcon}/> : icon == "X" ? <CloseOutlinedIcon sx={styleIcon}/> : icon;
    }

  // React.useEffect(()=>{
  //   let copyToFuncOnClick = []

  //   props.dataTable.listStudent.map((item,i)=>{
  //     props.saveData[i].map((item2, i2)=>{
  //       copyToFuncOnClick[i]= ()=>{
  //         if(props.saveData[i][i2] != props.saveTheDataSelection){
  //           let copySaveData = [...props.saveData]
  //           copySaveData[i][i2] = props.saveTheDataSelection
  //           props.setSaveData(copySaveData)
  //         }
  //       } 
  //     })
  //   })
  //   setFuncOnClick(copyToFuncOnClick)
  // },[props.saveTheDataSelection])

  
  React.useEffect(()=>{
    if(props.saveData){
      let arr = props.dataTable.listStudent.map((item,i)=>{
        // console.log(props.saveData[i]);
        let arr2 = props.saveData[i].map((item2, i2)=>{
        
          return {name: item}
        })
        
        // console.log("arr2 = ",arr2);
        return arr2[0]
      })
      // console.log("arr = ",arr);
      
      setRows(arr)
  
    }
  },[props.saveData])



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (<>
    {rows && 
      <Paper sx={{ width: '80%', overflow: 'hidden' , padding: "0.1rem"}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{color: "red", fontWeight: 700, fontSize:"1.4rem"}}
                key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,i3) => {
                // console.log("rows = ",rows);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                    {columns.map((column,i4) => {
                      // let copySaveData = [...saveData]
                      let value = row[column.id];
                      if(i4 > 0){
                        value = props.saveData[i3][i4 - 1];
                        // console.log("saveData = ",props.saveData[i3][i4]);
                        // console.log("value = ",value);
                        // console.log("i3 = ",i3);
                        return (
                          
                          <TableCell key={column.id} align={column.align}  onClick={props.funcOnClick[i3][i4 - 1]}  > 
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : getIcon(value)}
                          </TableCell>
                        );
                      }
                     
                      return (
                        
                        <TableCell key={column.id} align={column.align} sx={{ fontSize:"1.2rem"}}> 
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : getIcon(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          
        </Table>
      </TableContainer>

</Paper>
}
</>
  );
}
