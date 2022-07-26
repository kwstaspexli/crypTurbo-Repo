import * as React from 'react';
import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// to make react-router-dom to work i need to add these to my app.js route
// so {useHistory, useLocation, useParams} can do the work

import { ThemeProvider,createTheme,responsiveFontSizes } from '@mui/material/styles';

import Layout from './Components/Layout';
import Trading from './Pages/Trading';
import SingleCoin from './Pages/SingleCoin'
import Category from './Pages/Category';
  
let theme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: "#36454F",
    // },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    subtitle1 : {
      fontSize:18
    },
    subtitle2: {
      fontSize:17
    }
  },
  spacing: 6,
  //breakpoints
  // z-index -> https://mui.com/customization/z-index/
});

theme = responsiveFontSizes(theme);



function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
        <Layout >
          <Switch>
            <Route exact path="/">
            <Trading />
            </Route>
            <Route exact path="/coins/:coinId">
              <SingleCoin />
            </Route>
            <Route exact path="/coins/category/:categoryId">
              <Category />
            </Route>
            <Route exact path="/trading">
              <Trading />
            </Route>
          </Switch>
        </Layout>
        </Router>
    </ThemeProvider>
  );
}

export default App;
