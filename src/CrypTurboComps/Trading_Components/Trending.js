import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTrending } from "../../redux/actions/cryptosActions";
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


function Trending() {

  const classes = useStyles();

  const trending = useSelector((state) => state.trending.trending);
  const currency = useSelector((state) => state.currency.currency);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchTrending = async () => {
    const response = await axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setTrending(response.data), setLoading(false));
  };

  useEffect(() => {
    fetchTrending();
  }, [ currency.name]);// eslint-disable-line react-hooks/exhaustive-deps
                  //stop a warning

  //here i make the carousel items content
  const CarouselItems = trending.map((trending) =>
    <Card key={trending.id} sx={{maxWidth:200, borderRadius:5,mb:1,mt:3} }>
      <CardHeader
        avatar={<Avatar alt="crypto" src={trending.image} aria-label="Trending Cryptos" />}
        title=
        {<Typography component={'div'}>
        <Typography variant="h6" sx={{ fontWeight: 'fontWeightBold' }} >{trending.name}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary">{trending.symbol.toUpperCase()} </Typography>
        </Typography>}
      />
      <CardContent >
        <Typography variant="body1" align="center" sx={{ fontWeight: 'fontWeightMedium' }}>
        {currency.symbol}{Number(trending.current_price).toPrecision()}
        </Typography>

        <Typography component={'div'}>
          {trending.price_change_percentage_24h > 0 ?
            <Typography variant="h6" className={classes.positive} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
              <ArrowUpwardRoundedIcon />
              {`${Number(trending.price_change_percentage_24h).toFixed(2)} %`}
              </Typography>
            : <Typography variant="h6" className={classes.negative} align="center" sx={{ fontWeight: 'fontWeightBold' }}>
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
      items: 1,
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
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'fontWeightBold' }}> Trending Assets Today</Typography>
      {loading ?
      <CircularProgress size="55px" sx={{ display: 'flex', justifyContent:'center' }}/>
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
      autoPlay />}
    </div>);
}

export default Trending;