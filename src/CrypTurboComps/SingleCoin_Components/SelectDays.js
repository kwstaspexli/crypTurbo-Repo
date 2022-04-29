import React from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {setDays} from "../../redux/actions/cryptosActions"
import {chartDaysData} from "../../config/chartDaysData"
import useMediaQuery from '@mui/material/useMediaQuery';
import InputLabel from '@mui/material/InputLabel';

function SelectDays() {

    const matches = useMediaQuery('(min-width:400px)');
    const days = useSelector((state) => state.days.days);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setDays(event.target.value))
      };

    return (
        matches ?
        <Box sx={{ display:"flex", minWidth:10, width:120}}>
          <FormControl fullWidth>
            <Select
              labelId="select-days"
              id="select-days"
              value={days}
              onChange={handleChange}
            >
                    {chartDaysData.map((day) => (
                        <MenuItem
                        key={day.value}
                        value={day.value}
                        >
                          {day.label}
                        </MenuItem>
                    ))}
            </Select>
          </FormControl>
        </Box>
        :
        <Box sx={{ display:"flex", minWidth:10, width:50,height:0}}>
            <FormControl fullWidth>
                <InputLabel id="select-day">Days</InputLabel>
                <Select
                    labelId="select-days"
                    id="select-days"
                    onChange={handleChange}
                >
                  {chartDaysData.map((day) => (
                      <MenuItem
                      key={day.value}
                      value={day.value}
                      >
                        {day.label}
                      </MenuItem>
                  ))}
                </Select>
            </FormControl>
        </Box>

      );
}

export default SelectDays;