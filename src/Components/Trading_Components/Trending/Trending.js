import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTrending } from "../../../redux/actions/cryptosActions";
import { makeStyles } from '@mui/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
 

const useStyles = makeStyles((theme) => {
  return {
    page:{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      flexWrap: "wrap",
      padding: theme.spacing(4),
    },
    positive: {
      color: 'green',
    },
    negative: {
      color: 'red',
    }
  }
});


function Trending() {

  const classes = useStyles();

  const trending = useSelector((state) => state.trending.trending);
  const currency = useSelector((state) => state.currency.currency);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:800px)');

  const fetchTrending = async () => {
    const response = await axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setTrending(response.data), setLoading(false));
  };

  useEffect(() => {
    fetchTrending();
  }, [currency.value]);// eslint-disable-line react-hooks/exhaustive-deps
                  //stop a warning

  const CarouselItems = trending.map((trending) =>
    <Card key={trending.id} sx={{maxWidth:220, borderRadius:5,mb:1,mt:3, mr:2} }>
      <Link to={`/coins/${trending.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <CardHeader
          component={'div'}
          avatar={<Avatar alt="crypto" src={trending.image} aria-label="Trending Cryptos" />}
          title=
          {<Typography component={'div'}>
              <Typography variant="h6" 
                sx={{ fontWeight: 'fontWeightBold' }} >
                  {matches && trending.name}
              </Typography>
              <Typography variant="subtitle2"
                sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary">
                    {trending.symbol.toUpperCase()} 
              </Typography>
          </Typography>}
        />
      </Link>
      <CardContent >

        <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'fontWeightMedium' }}>
        {currency.symbol} {Number(trending.current_price).toLocaleString()}
        </Typography>

        <Typography component={'div'}>
          {/* Arrow Up - ArrowDown */}
          {trending.price_change_percentage_24h > 0 ?
            <Typography variant="subtitle2" className={classes.positive}
              align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                <ArrowUpwardRoundedIcon />
                  {`${Number(trending.price_change_percentage_24h).toFixed(2)} %`}
            </Typography>
            : <Typography variant="subtitle2" className={classes.negative}
                align="center" sx={{ fontWeight: 'fontWeightBold' }}>
                  <ArrowDownwardRoundedIcon />
                    {`${Number(trending.price_change_percentage_24h).toFixed(2)} %`}
              </Typography>
          }
        </Typography>

      </CardContent>
    </Card>
  );

  const responsive = {
    0: {
      items: 1,
    },
    360:{
      items: 2,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  };

  return (
    <div className={classes.page}>
      <Typography variant="h4" component ="h2" gutterBottom
       sx={{ fontWeight: 'fontWeightBold' }}> Trending Assets Today</Typography>
      {loading ? <CircularProgress size="55px" />
      :
      <AliceCarousel
      autoHeight
      autoPlayInterval={1000}
      animationDuration={1500}
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={CarouselItems}
      mouseTracking
      touchTracking
      autoPlay />}
    </div>);
}

export default Trending;