import React,{useState} from "react";
import { useSelector } from "react-redux";
import Datagrid from "./Datagrid";
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import CurrencyTab from "../../CurrencyTab";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => {
  return {
    page:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(6),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap:"wrap",
      gap:30
    }
  }
});

function DatagridSearch() {

    const classes = useStyles();
    const [search,setSearch] = useState("");
    const tableData = useSelector((state) => state.coins.coins);

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
      <Typography variant="h4" component="h2"
      sx={{ fontWeight: 'fontWeightBold' }}>
        Explore Assets
      </Typography>
    <CurrencyTab />
    </div>
    <TextField placeholder="Search" 
    sx={{ minWidth:120, width:200}}
    defaultValue="" 
    margin="dense" 
    onChange={(e) => setSearch(e.target.value)} />
    <Datagrid handleSearch={handleSearch()}/>
    </div>);

}

export default DatagridSearch;