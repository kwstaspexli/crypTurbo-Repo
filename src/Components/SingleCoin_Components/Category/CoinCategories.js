import React from 'react'
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';



function CoinCategories() {


    const coin = useSelector((state) => state.coin);
    const coin_categories = useSelector((state) => state.coin_categories.coin_categories);
    let flag = false;
    const categories = coin.categories.map((category,index) => {
                return (
                        category !== null ? 
                        coin_categories.map((coinCategories) => {
                            return (
                                coinCategories !== null && category === coinCategories.name ?
                                <div key={index} >
                                {flag = true}                            
                                <Chip
                                    key={coinCategories.id}
                                    label={coinCategories.name}
                                    component="a"
                                    href={`./category/${coinCategories.id}`}
                                    variant="outlined"
                                    clickable
                                    sx={{color:"#000", backgroundColor:"#f2f2f2"}}
                                />           
                                </div>
                                :null
                                )})
                            :null
                )});

    return ( <>
    {flag ? 
    <div>
    <Typography variant="h5" 
    sx={{ mt:10, fontWeight: 'fontWeightBold'}} >
        Supported Blockchain Categories 
    </Typography>
    <Box sx={{ display:"flex", mt:2,
    flexDirection:"row", justifyContent:"flex-start", flexWrap:"wrap", 
    columnGap:1, rowGap:2 }}>
    {categories} 
    </Box>
    </div>
    : null}</> );
}

export default CoinCategories;