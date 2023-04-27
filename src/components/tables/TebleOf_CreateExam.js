
import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
 



export default function TebleOf_CreateExam(props) {
  
  const [rows, setRows] = React.useState(props.TableContent.listStudents);
  

  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'score', label: 'Score', minWidth: 100 },
  ];


  function getInput(value, i) {
    return(
      <input min={0} max={100} className="input_CreateExam" type={"number"} value={value[i]} onChange={(e)=>{
        let copyScoreList = [...value];
        let value3 = e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value
        console.log(value3);
        copyScoreList[i] = value3
        props.setScoreList(copyScoreList)
    }}></input>
    )
  }


  return (<>
    {rows &&
    
    <Paper sx={{ width: '80%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              
              {columns.map((column) => (
                <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                sx={{fontWeight: 800 ,fontSize: "1.4rem"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .map((nameOfStudent, index_row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={nameOfStudent} >
                    {columns.map((column, index_column) => {
                      const value = nameOfStudent
                      if(index_column > 0){

                        return (
                          <TableCell key={column.id} align={column.align} sx={{fontSize: "1.4rem"}}>
                            {getInput(props.TableContent.scoreList,index_row)}
                          </TableCell>
                        );

                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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

