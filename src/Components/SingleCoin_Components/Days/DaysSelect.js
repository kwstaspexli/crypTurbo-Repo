import React, {useState} from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {setDays} from "../../../redux/actions/cryptosActions"
import {chartDaysData} from "../../../config/chartDaysData"
import TextField from '@mui/material/TextField';

function SelectDays() {

    const days = useSelector((state) => state.days.days);
    const dispatch = useDispatch();

    const [displayLast, setDisplayLast] = useState(false);
    const [custom,setCustom] = useState(0);

    const handleChange = (event,index) => {
      dispatch(setDays(event.target.value));
      if(index.props.children === 'Custom') 
      {setDisplayLast(true)}
      else
      {setDisplayLast(false)}
      };

    return (
        <Box sx={{ display:"flex", flexDirection:"row", width:120}}>
          <FormControl fullWidth>
            <Select
              labelId="select-days"
              id="select-days"
              value={days}
              onChange={handleChange}
            >
                    {chartDaysData.map((day) => (
                        <MenuItem
                        key={day.id}
                        value={day.value}
                        >
                          {day.label}
                        </MenuItem>
                    ))}
                        <MenuItem
                        key={custom}
                        defaultValue={custom}
                        value={custom}
                        >
                          Custom
                        </MenuItem>
            </Select>
            
            {/* Textfield when the client wants to add a custom number the days before */}
            {displayLast ? 
             <Box sx={{ display:"flex", flexDirection:"column"}}>
             <TextField placeholder="Days ago" 
                 sx={{ minWidth:120, width:80}}
                 type='number'
                 value={days} 
                 margin="dense" 
                 onChange={(event) =>{
                  setCustom(event.target.value)
                  dispatch(setDays(event.target.value))}} />
              </Box>      
            : null}
          </FormControl>
        </Box>
      );
}

export default SelectDays;