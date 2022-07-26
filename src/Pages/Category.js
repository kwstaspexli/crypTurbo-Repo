import React,{ useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSingleCoinCategories } from "../redux/actions/cryptosActions"
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Moment from 'react-moment';
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import useMediaQuery from '@mui/material/useMediaQuery';


const useStyles = makeStyles((theme) => {
    return {
      page: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(6),
        marginTop: '5%'
      },
      positive: {
        color: 'green',
      },
      negative: {
        color: 'red',
      }
    }
  });

function Category() {
    const classes = useStyles();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const coin_categories = useSelector((state) => state.coin_categories.coin_categories);
    const matches = useMediaQuery('(min-width:600px)');

    const fetchSingleCoinCategories = async () => {
      const response = await axios
        .get("https://api.coingecko.com/api/v3/coins/categories")
        .catch((err) => {
          console.log("Err: ", err);
        });
      dispatch(setSingleCoinCategories(response.data));
    };

    useEffect(() => {
       fetchSingleCoinCategories();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
                    //stop a warning

    const categoryHeader=
          Object.keys(coin_categories).length === 0 ? 
          (<CircularProgress size="55px" />)
          :(
            coin_categories.map((category) =>          
            category.id === categoryId ?
                        <div key={category.id}>
                          <Typography variant="h4" sx={{ fontWeight: 'fontWeightBold' }} >
                            {category.name} 
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightMedium' }} color="text.secondary" >
                               Updated at <Moment format = "MMMM Do YYYY, h:mm:ss a">{category.last_updated}</Moment>
                            </Typography>
                        </div> 
            : null )
            );

    const stats = 
    Object.keys(coin_categories).length === 0 ? 
          (<CircularProgress size="55px" />)
          :(
            coin_categories.map((category) =>          
            category.id === categoryId ?
            <Card key={category.id} sx={{ borderRadius:5,mb:1,mt:3, width: "32%", minWidth:280} }>
            <CardHeader
                title=
                {<div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap" }}>
                <Typography component={'div'}>
                  <Typography variant="h5" component="span" sx={{ fontWeight: 'fontWeightBold', display:"flex" }} >
                    Stats  
                  </Typography>
                </Typography>
                </div>}
            />
            <CardContent>
                    <Box sx={{display:"flex", margin: "-10px 10px 10px 10px", flexDirection:"column",
                    justifyContent:"flex-start", flexWrap:"wrap", columnGap:5, rowGap:5, flexGrow:"1" }}>
                       
                            <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                            Market Cap: {category.market_cap.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                              Volume 24h: {category.volume_24h.toLocaleString()}
                            </Typography>

                            <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                              Top 3 Coins : 
                            </Typography>

                              <Box sx={{ display:"flex",flexDirection:"row",
                              justifyContent:"flex-start", flexWrap:"wrap", 
                              columnGap:5, rowGap:5, flexGrow:"1" }}>
                          
                                {category.top_3_coins.map((coinIMG,index) => (
                                    <img
                                      sx={{borderRadius:"50%"}}
                                      src={coinIMG}
                                      alt={index}
                                      loading="lazy"
                                    />
                              ))}
                            </Box>
            
                    </Box>  
            </CardContent>
        </Card>
            : null )
            );


    const content = 
    Object.keys(coin_categories).length === 0 ? 
          (<CircularProgress size="55px" />)
          :(
            coin_categories.map((category) =>          
            category.id === categoryId && category.content ?
            <Card key={category.id} sx={{ borderRadius:5,mb:1,mt:3, width: "62%",minWidth:280} }>
            <CardHeader
                title=
                {<div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap" }}>
                <Typography component={'div'}>
                  <Typography variant="h5" component="span" sx={{ fontWeight: 'fontWeightBold', display:"flex" }} >
                    Content  
                  </Typography>
                </Typography>
                </div>}
            />
            <CardContent>
                    <Box sx={{display:"flex", margin: "-10px 10px 10px 10px", flexDirection:"column",
                    justifyContent:"flex-start", flexWrap:"wrap", columnGap:5, rowGap:5, flexGrow:"1" }}>
                       
                            <Typography variant="subtitle2" sx={{ fontWeight: 'fontWeightMedium' }} > 
                            {category.content}
                            </Typography>
                    </Box>  
            </CardContent>
        </Card>
            : null )
            );


    return (  <div className={classes.page}>
        {categoryHeader}
        {matches ? 
        <div style={{display:"flex", justifyContent:"space-between"}}>
        {stats}
        {content}
        </div>
        :
        <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
        {stats}
        {content}
        </div>
        }
    </div>);
}

export default Category;