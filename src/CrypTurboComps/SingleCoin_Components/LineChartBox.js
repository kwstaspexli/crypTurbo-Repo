import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LineChart from './LineChart';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import useMediaQuery from '@mui/material/useMediaQuery';
import SelectDays from './SelectDays';



const useStyles = makeStyles((theme) => {
  return {
    page:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    }
  }
});

function LineChartBox({chartData, flag, coin}) {

    const classes = useStyles();
    const currency = useSelector((state) => state.currency.currency);
    const days = useSelector((state) => state.days.days);
    const matches = useMediaQuery('(min-width:400px)');
 
    const Chart = 
    Object.keys(coin).length === 0 ? (
        //without object.keys -> the coin.image.small wont show up
        <CircularProgress size="55px" sx={{ display: 'flex', justifyContent:'center' }}/>
      ) : (
    <Card key={coin.id} sx={{ borderRadius:5,mb:1,mt:3} }>
      <CardHeader
        avatar={<Avatar alt="crypto" src={coin.image.large} aria-label="Coin"
         sx={{ height:'45px', width:'45px', maxHeight: '45px', maxWidth: '45px' }} />}
        title=
        {<Typography component={'div'}>
        <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }} >{coin.name}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary">{coin.symbol.toUpperCase()} </Typography>
        </Typography>}
      />
      <CardContent >
      {matches ?
            //box statistics
            <Box sx={{display:"flex", margin: "-10px 20px 20px 20px", flexDirection:"row", justifyContent:"space-between"}}>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                      <Typography variant="h6" align="center" sx={{ fontWeight: 'fontWeightMedium' }}>
                      {currency.symbol}{Number(coin.market_data.current_price[currency.name.toLowerCase()])}
                      </Typography>
                        <Typography component={'div'} sx={{ ml:"10px" }}>
                        {coin.price_change_percentage_24h > 0 ?
                          <Typography variant="body1" className={classes.positive} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                        <ArrowUpwardRoundedIcon />
                        {`${Number(coin.market_data.price_change_percentage_24h_in_currency[currency.name.toLowerCase()]).toFixed(2)} %`}
                        </Typography>
                      : <Typography variant="body1" className={classes.negative} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                        <ArrowDownwardRoundedIcon />
                        {`${Number(coin.market_data.price_change_percentage_24h_in_currency[currency.name.toLowerCase()]).toFixed(2)} %`}
                        </Typography>
                    }
                  </Typography> 
                </div>      
                  <SelectDays />
              </Box>
              //select buttons 
        :
            //box statistics
            <Box sx={{display:"flex", margin: "-10px 20px 20px 20px", flexDirection:"row", justifyContent:"space-between"}}>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
              <Typography variant="h6" align="center" sx={{ fontWeight: 'fontWeightMedium' }}>
                {currency.symbol}{Number(coin.market_data.current_price[currency.name.toLowerCase()])}
                </Typography>

                <Typography component={'div'} sx={{ ml:"10px"}}>
                  {coin.price_change_percentage_24h > 0 ?
                    <Typography variant="body1" className={classes.positive} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                      <ArrowUpwardRoundedIcon />
                      {`${Number(coin.market_data.price_change_percentage_24h_in_currency[currency.name.toLowerCase()]).toFixed(2)} %`}
                      </Typography>
                    : <Typography variant="body1" className={classes.negative} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                      <ArrowDownwardRoundedIcon />
                      {`${Number(coin.market_data.price_change_percentage_24h_in_currency[currency.name.toLowerCase()]).toFixed(2)} %`}
                      </Typography>
                  }
                </Typography>
                </div>
                <SelectDays />
              </Box>
              //select buttons 
        }
        {/* //lineChart */}
      <LineChart chartData={chartData} flag={flag}/>
      </CardContent>
      
    </Card>)

    return ( <div>
        {Chart}
    </div> );
}

export default LineChartBox;