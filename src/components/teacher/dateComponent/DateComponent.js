
import './DateComponent.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';



export default function DateComponent(props) {

    

  return (
    <div className='DateComponent'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
            <DesktopDatePicker
            inputFormat="MM/DD/YYYY"
            value={props.value}
            onChange={props.handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </Stack>
        </LocalizationProvider>
    </div>
  );
}


