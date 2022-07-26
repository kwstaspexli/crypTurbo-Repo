import React,{useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { setCoins } from "../redux/actions/cryptosActions"
import DatagridSearch from "../Components/Trading_Components/DataGrid/DatagridSearch"
import axios from "axios";
import Trending from "../Components/Trading_Components/Trending/Trending";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => {
  return {
    page: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      marginTop: 50
    },
  }
});

function Trading() {

    const classes = useStyles();
    const currency = useSelector((state) => state.currency.currency);
    const dispatch = useDispatch();
  
  const fetchCryptos = async () => {
    const response = await axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C%2030d%2C%20200d%2C%201y`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setCoins(response.data));
  };

  useEffect(() => {
    fetchCryptos();
  }, [currency.value]);// eslint-disable-line react-hooks/exhaustive-deps
                  //stop a warning

  

    return ( 
    <div className={classes.page}>
    <Trending />
    <DatagridSearch />
    </div> );
}

export default Trading;