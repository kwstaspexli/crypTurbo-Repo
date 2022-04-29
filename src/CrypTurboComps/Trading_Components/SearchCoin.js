import React,{useState} from "react"
import Datagrid from "./Datagrid";
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Currency from "./Currency";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => {
  return {
    page:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2),
      marginTop: '2%'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    }
  }
});

function SearchCoin({tableData}) {

    const classes = useStyles();
    const [search,setSearch] = useState("");

    const handleSearch = () => {
        return tableData.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

    return ( 
    <div className={classes.page}>
    <div className={classes.header}>
    <Typography variant="h4" sx={{ fontWeight: 'fontWeightBold' }}>Explore Assets</Typography>
    <Currency />
    </div>
    <TextField placeholder="Search" 
    sx={{ minWidth:120, width:180}}
    defaultValue="" 
    margin="dense" 
    onChange={(e) => setSearch(e.target.value)} />
    <Datagrid handleSearch={handleSearch()}/>
    </div>);

}

export default SearchCoin;