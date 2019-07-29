import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Navbar from '../components/Navbar'
import HeadlineCard from '../components/HeadlineCard'





const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

  export default function Sidebar(props){

    const classes = useStyles();

    const getArticleCardData = () => props.latestHeadlines.map(headline => <HeadlineCard headlineData={headline}/> )

    const handleClick = (e) => {
      props.getCuratedHeadlines()
    }

  //   const getArticleCardData = (props) => ( 
  //     props.latestHeadlines.map(headline => <HeadlineCard headline={headline} />)
  //   )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Navbar />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
         
            <ListItem button key={"Latest Headlines"}>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary={"Latest Headlines"} />
            </ListItem>
       
        </List>
        <Divider />
        <List>
         
            <ListItem button key={"My Curated Articles"} onClick={(e) => handleClick(e)}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"My Curated Articles"} />
            </ListItem>

            <ListItem button key={"Edit Favourite Sources"}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"Edit Fav Sources"} />
            </ListItem>
      
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            {getArticleCardData()}
      </main>
    </div>
  );
}

