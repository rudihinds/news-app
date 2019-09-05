import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import newsapp from "./NewsApp.png"
import newsapp2 from "./NewsApp2.png"


const Navbar = ({showLogin, handleClick, handleLogOut}) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    navbarLogo: {
      width: '55px',
      height: '55px',
      paddingTop: "5px",
      paddingBotom: "5px",
      marginLeft: "10px"
    },
    title: {
      flexGrow: 1,
      color: 'white',
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to='/' className={classes.title}>
          <img className={classes.navbarLogo} src={newsapp2}/></Link>
        {showLogin && <Button onClick={handleClick} color="inherit">Login</Button>}
        {!showLogin && <Button onClick={handleLogOut} color="inherit">Logout</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;