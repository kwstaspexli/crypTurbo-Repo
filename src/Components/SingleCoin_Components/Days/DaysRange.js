import  React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export default function DaysRange() {
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);

//console.log(Math.floor(StartDate));
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        value={StartDate}
        maxDate={EndDate}
        onChange={(newDate) => {
            // i use Math.floor to convert the date to UNIX Timestamp
            // so i can pass these params to the HistoricRangeData request
          setStartDate(Math.floor(newDate));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
        <ArrowRightAltRoundedIcon color="action" fontSize="large" sx={{mt:1}} />
      <DatePicker
        label="End Date"
        value={EndDate}
        minDate={StartDate}
        onChange={(newDate) => {
          setEndDate(Math.floor(newDate));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    </div>
  );
}