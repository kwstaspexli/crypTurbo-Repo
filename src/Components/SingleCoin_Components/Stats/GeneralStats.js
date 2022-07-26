import React from 'react'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => {
    return {
      box:{
        display:"flex", 
        margin: "-10px 10px 10px 10px", 
        flexDirection:"row",
        justifyContent:"flex-start", 
        flexWrap:"wrap", 
        columnGap:20,
        rowGap:35, 
        flexGrow:"1",
        alignItems:'center',

        "& div":{
            width:200
        }
      },
      positive: {
        color: 'green',
      },
      negative: {
        color: 'red',
      }
    }
  });
  

function GeneralStats() {
    const classes = useStyles();
    const currency = useSelector((state) => state.currency.currency);
    const coin = useSelector((state) => state.coin);

    const StatsBox = 
    Object.keys(coin).length === 0 ? (
     <CircularProgress size="55px" />
    ):(
        <Card key={coin.id} sx={{ borderRadius:5,mb:1,mt:3} }>
            <CardHeader
                title=
                {<Typography component={'div'}>
                <Typography variant="h5" sx={{ fontWeight: 'fontWeightBold' }} >Stats</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary" >
                    Updated at <Moment format = "MMMM Do YYYY, h:mm:ss a">{coin.last_updated}</Moment></Typography>
                </Typography>}
            />
            <CardContent>
            <Box className={classes.box}>
            <div>
                <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Market Cap</Typography>
                <Typography variant='subtitle2'> {`${coin.market_data.market_cap[currency.value].toLocaleString()} ${currency.symbol}`}</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.market_cap_change_percentage_24h > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.market_cap_change_percentage_24h_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div >
                <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Total Volume</Typography>
                <Typography variant='subtitle2'> {`${coin.market_data.total_volume[currency.value].toLocaleString()} ${currency.symbol}`}</Typography> 
            </div>
            <div >
                <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Liquidity Score</Typography>
                <Typography variant='subtitle2'> {`${coin.liquidity_score / 100} `}</Typography>
            </div>
            <div>
                <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> CoinGecko Score</Typography>
                <Typography variant='subtitle2'> {`${coin.coingecko_score.toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant='subtitle1' sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Community Score</Typography>
                <Typography variant='subtitle2'> {`${coin.community_score.toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Alexa Rank</Typography>
                <Typography variant='subtitle2'> {coin.public_interest_stats.alexa_rank} </Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Highest in 24h</Typography>
                <Typography variant='subtitle2'> {`${coin.market_data.high_24h[currency.value].toLocaleString()} ${currency.symbol}`} </Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Lowest in 24h</Typography>
                <Typography variant='subtitle2'> {`${coin.market_data.low_24h[currency.value].toLocaleString()} ${currency.symbol}`} </Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 1H</Typography>
                <Typography variant='subtitle2' className=
                 {`${coin.market_data.price_change_percentage_1h_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_1h_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 1D</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.price_change_percentage_24h_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_24h_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 1W</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.price_change_percentage_7d_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_7d_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 1M</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.price_change_percentage_30d_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_30d_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 2M</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.price_change_percentage_60d_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_60d_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            <div>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary"> Price Change 1Y</Typography>
                <Typography variant='subtitle2' className=
                {`${coin.market_data.price_change_percentage_1y_in_currency[currency.value] > 0 ? classes.positive : classes.negative}`}
                > {`${Number(coin.market_data.price_change_percentage_1y_in_currency[currency.value]).toFixed(2)} %`}</Typography> 
            </div>
            </Box>
            </CardContent>
        </Card>
        
    )
    return ( <div>
        {StatsBox}
    </div>
    );
}

export default GeneralStats;