import React from 'react'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Moment from 'react-moment';
import CurrencyTab from "../../CurrencyTab";
import CoinCategories from '../Category/CoinCategories';

  function TickerStats() {
    const currency = useSelector((state) => state.currency.currency);
    const coin = useSelector((state) => state.coin);
    
    const tickerStats =
    Object.keys(coin).length === 0 ? (
      <CircularProgress size="55px" />
     ):(
    coin.tickers.map((ticker) =>          
      ticker.coin_id === coin.id && ticker.target === currency.value.toUpperCase() ?
                  <div key={ticker.market.name}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'fontWeightBold' }} >
                      {ticker.market.name} 
                      </Typography>

                      <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                      Volume: {ticker.volume.toLocaleString()}</Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                       Bid-Ask difference: {`${ticker.bid_ask_spread_percentage.toFixed(4)} %`}</Typography>
                  </div> 
                  : null ))

    const StatsBox = 
    Object.keys(coin).length === 0 ? (
     <CircularProgress size="55px" />
    ):(
        <Card key={coin.id} sx={{ borderRadius:5,mb:1,mt:3} }>
            <CardHeader
                title=
                {<div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap" }}>
                
                <Typography component={'div'}>
                <Typography variant="h5" component="span" sx={{ fontWeight: 'fontWeightBold', display:"flex" }} >
                  Stats by Ticker ({coin.symbol}/
                  <Typography variant="h5" component="span" color="text.secondary" sx={{ fontWeight: 'fontWeightBold' }}>
                    {currency.value}
                  </Typography>) 
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary" >
                    Updated at <Moment format = "MMMM Do YYYY, h:mm:ss a">{coin.last_updated}</Moment></Typography>
                </Typography>
                <CurrencyTab />
                </div>}
            />
            <CardContent>
                    <Box sx={{display:"flex", margin: "-10px 10px 10px 10px", flexDirection:"row",
                    justifyContent:"flex-start", flexWrap:"wrap", columnGap:25, rowGap:5, flexGrow:"1" }}> 
                    {tickerStats}
                    </Box>
                    <CoinCategories />   
            </CardContent>
        </Card>
        
    )
    return ( <div>
        {StatsBox}
    </div>
    );
}

export default TickerStats;