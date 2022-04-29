import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

import Drawer from '@mui/material/Drawer'
//https://codesandbox.io/s/l3jo9u?file=/demo.js&resolutionWidth=320&resolutionHeight=675

import Typography from '@mui/material/Typography'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
// npm install @mui/icons-material


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import useMediaQuery from '@mui/material/useMediaQuery';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: "100%",
      padding: theme.spacing(2),
    },
    pagePC: {
      background: '#f9f9f9',
      width: `calc(100% - ${drawerWidth}px)`,
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(6),
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2)
    }, 
  }
});

function Layout({ children }, props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const matches = useMediaQuery('(min-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [MenuItem_current, SetMenuItem_current] = useState("");
  const handleClick = (e) =>{
    SetMenuItem_current(e);
  }

  const menuItems = [
    { 
      text: 'My Notes', 
      icon: <SubjectOutlinedIcon color="secondary" />, 
      path: '/' 
    },
    { 
      text: 'Create Note', 
      icon: <CircleOutlinedIcon color="secondary" />, 
      path: '/create' 
    },
    { 
      text: 'Trading', 
      icon: <ShowChartRoundedIcon color="secondary" />, 
      path: '/trading' 
    },
    { 
      text: 'Watchlist', 
      icon: <AddBoxOutlinedIcon color="secondary" />, 
      path: '/watchlist' 
    },
    { 
      text: 'Social', 
      icon: <PeopleAltOutlinedIcon color="secondary" />, 
      path: '/social' 
    },
  ];

  const drawer = (<div>
        <Toolbar>
          <Typography  variant="h4" sx={{ fontWeight: 'fontWeightBold' }} className={classes.title}>
            CrypTurbo
          </Typography>
          {mobileOpen ? <IconButton onClick={() =>{setMobileOpen(false);}}>
                          <ArrowBackIosNewRoundedIcon color="secondary" />
                        </IconButton>  : null }
          </Toolbar>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() =>{handleClick(item.text); history.push(item.path); setMobileOpen(false);}}
              //that way you add two functions to one onclick field!
              className={location.pathname === item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        </div>);


  return (
    <div style={{display: "flex"}}>
      {/* app bar */}
      <AppBar 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
          //ml = marginLeft
        }}
        elevation={1}
        //shadow
        color="primary"
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography>{MenuItem_current}</Typography>
          <Avatar alt='logo1' className={classes.avatar} src="/logo192.png" />
          {/* src from public folder */}
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="crypTurbo nav List"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* main content */}
      {matches ?
      <div className={classes.pagePC}>
        <div className={classes.toolbar}>
          { children }
        </div>
      </div>
      :
      <div className={classes.page}>
        <div className={classes.toolbar}>
          { children }
        </div>
      </div>}
  </div>
  );
}

export default Layout;