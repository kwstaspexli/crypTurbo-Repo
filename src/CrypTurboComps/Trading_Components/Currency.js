import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {setCurrency} from "../../redux/actions/cryptosActions"

function Currency() {

    const currency = useSelector((state) => state.currency.currency);
    const dispatch = useDispatch();

    const handleChange = (event) => {

        if(event.target.value === "EUR"){dispatch(setCurrency({name:event.target.value, symbol:"€"}));}
        else {dispatch(setCurrency({name:event.target.value, symbol:"$"}));}
      };

    return (
        <Box sx={{ minWidth:80, width:120}}>
          <FormControl fullWidth>
            <InputLabel id="select-currency">Currency</InputLabel>
            <Select
              labelId="select-currency"
              id="select-currency"
              value={currency.name}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              {/* <MenuItem value={"INR"}>INR</MenuItem> */}
            </Select>
          </FormControl>
        </Box>
      );
}

export default Currency;