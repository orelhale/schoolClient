
    import * as React from 'react';
    import Box from '@mui/material/Box';
    import InputLabel from '@mui/material/InputLabel';
    import FormControl from '@mui/material/FormControl';
    import NativeSelect from '@mui/material/NativeSelect';
    import Toolbar from '@mui/material/Toolbar';


    export default function But2() {
      let array = ["Ten",'Twenty','Thirty']
      return (
        <div className=''>
        <Toolbar sx={{ display: 'inline-flex',width:"90%" , justifyContent:'center'}}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              class
            </InputLabel >
            <NativeSelect
              defaultValue={array[0]} >
                  {array.map((item,i)=>{
                    return <option color='primary' value={item}>{item}</option>
                  })}
            </NativeSelect>
          </FormControl>
        </Toolbar>
        </div>
      );
    }
    