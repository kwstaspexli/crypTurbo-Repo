import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSingleCoin, setSingleCoinCategories, setSingleCoinTickers } from "../redux/actions/cryptosActions"
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Chart from "../Components/SingleCoin_Components/Charts/Chart";
import GeneralStats from "../Components/SingleCoin_Components/Stats/GeneralStats";
import TickerStats from "../Components/SingleCoin_Components/Stats/TickerStats";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(6),
      marginTop: '5%'
    },
  }
});

function SingleCoin() {

    const classes = useStyles();
    const { coinId } = useParams();

    const coin = useSelector((state) => state.coin);
    const currency = useSelector((state) => state.currency.currency);
    const days = useSelector((state) => state.days.days);
    const dispatch = useDispatch();

    const [historicData, setHistoricData] = useState();
    const [flag,setflag] = useState(false);


      const fetchSingleCoin = async (id) => {
        const response = await axios
          .get(`https://api.coingecko.com/api/v3/coins/${id}`)
          .catch((err) => {
            console.log("Err: ", err);
          });
        dispatch(setSingleCoin(response.data));
      };

      const fetchSingleCoinTickers = async (id) => {
        const response = await axios
          .get(`https://api.coingecko.com/api/v3/coins/${id}/tickers`)
          .catch((err) => {
            console.log("Err: ", err);
          });
        dispatch(setSingleCoinTickers(response.data));
      };

      const fetchSingleCoinCategories = async () => {
        const response = await axios
          .get("https://api.coingecko.com/api/v3/coins/categories")
          .catch((err) => {
            console.log("Err: ", err);
          });
        dispatch(setSingleCoinCategories(response.data));
      };

      const fetchHistoricData = async (id) => {
        const { data } = await axios
        .get( `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.value}&days=${days}`)
        .catch((err) => {
          console.log("Err: ", err);
        })
        setflag(true);
        setHistoricData(data.prices);
      };
    
      useEffect(() => {
        // make a timer to fetch the data every 5 seconds
         fetchSingleCoin(coinId);
         fetchSingleCoinTickers(coinId);
         fetchHistoricData(coinId);
         fetchSingleCoinCategories();
      }, [coinId,days]);// eslint-disable-line react-hooks/exhaustive-deps
                      //stop a warning


    return (    <div className={classes.page}>
      {/* να τα βγαλω ta params δεν χρειαζονται λογω του redux */}
                    <Chart chartData={historicData} flag={flag} coin={coin}/>
                    <GeneralStats />  
                    <TickerStats />
                </div>);
}

export default SingleCoin;