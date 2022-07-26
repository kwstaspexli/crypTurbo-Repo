import React from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {setCurrency} from "../redux/actions/cryptosActions";
import {currencyData} from "../config/currencyData"
import ListSubheader from '@mui/material/ListSubheader';

import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";
 
function CurrencyTab() {

    const currency = useSelector((state) => state.currency.currency);
    const dispatch = useDispatch();

    const handleChange = (event,index) => {
        dispatch(setCurrency(
            {   label: index.props.label,
                value: event.target.value,
                symbol: index.props.symbol 
            }));     
    }
    return ( 
    <Box>
        <FormControl fullWidth>
        <InputLabel id="select-currency">Currency</InputLabel>
        <Select
            labelId="select-currency"
            id="select-currency"
            value={currency.value}
            label="Currency"
            onChange={handleChange}
            >
              <ListSubheader
                  color="primary" 
                  sx={{ fontWeight: 'fontWeightBold', fontSize:20}}>
                    Fiat Currencies
                    <Divider 
                    flexItem={true} 
                    variant="middle" 
                    component="div"
                    sx={{ bgcolor: "secondary.light" }} />
              </ListSubheader>

              {currencyData.fiat_currencies.map((currencyFiat) => (
                  <MenuItem
                  key={currencyFiat.label}
                  label={currencyFiat.label}
                  symbol={currencyFiat.symbol}
                  value={currencyFiat.value}
                  >
                    <Typography variant="body1">{currencyFiat.label}</Typography>
                  </MenuItem>
              ))}

              <ListSubheader
                  color="primary" 
                  sx={{ fontWeight: 'fontWeightBold', fontSize:20 }}>
                    Crypto Currencies
                    <Divider 
                    flexItem={true} 
                    variant="middle" 
                    component="div"
                    sx={{ bgcolor: "secondary.light" }} />
              </ListSubheader>
              
              {currencyData.Cryptocurrencies.map((currencyCrypto) => (
                  <MenuItem
                  key={currencyCrypto.label}
                  label={currencyCrypto.label}
                  symbol={currencyCrypto.symbol}
                  value={currencyCrypto.value}
                  >
                    <Typography variant="body1">{currencyCrypto.label}</Typography>
                  </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
      );
}

export default CurrencyTab;