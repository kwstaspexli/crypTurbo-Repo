import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSingleCoin } from "../redux/actions/cryptosActions"
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import LineChartBox from "../CrypTurboComps/SingleCoin_Components/LineChartBox";

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

      const fetchHistoricData = async (id) => {
        const { data } = await axios
        .get( `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=${days}`)
        .catch((err) => {
          console.log("Err: ", err);
        })
        setflag(true);
        setHistoricData(data.prices);
      };
    
      useEffect(() => {
        // make a timer to fetch the data every 5 seconds
         fetchSingleCoin(coinId);
         fetchHistoricData(coinId)
      }, [coinId,days]);// eslint-disable-line react-hooks/exhaustive-deps
                      //stop a warning


    return (    <div className={classes.page}>
                    <LineChartBox chartData={historicData} flag={flag} coin={coin}/>
                    {/* <LineChart chartData={historicData} flag={flag} days={days} /> */}
                </div>);
}

export default SingleCoin;