import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HeadlinesContainer from '../containers/HeadlinesContainer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  }
}));

  export default function Sidebar({getCuratedHeadlines, headlines, savedArticles, toggleSavedArticle, totalHeadlines, hasNextPage, isNextPageLoading, loadNextPage}){

    const classes = useStyles();

    const handleClick = (e) => {
      getCuratedHeadlines()
    }

    const handleClickTwo = (e) => {
      alert("User Sources Clicked!")
    }
    
  return (
    <div className={classes.root}>
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
         <br/>
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

            <ListItem button key={"Edit Favourite Sources"} onClick={(e) => handleClickTwo(e)}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary={"Edit Fav Sources"} />
            </ListItem>
      
        </List>
      </Drawer>
      <HeadlinesContainer 
        headlines={headlines} 
        savedArticles={savedArticles} 
        toggleSavedArticle={toggleSavedArticle}
        totalHeadlines={totalHeadlines} 
        hasNextPage={hasNextPage} 
        isNextPageLoading={isNextPageLoading} 
        loadNextPage={loadNextPage}
      />
    </div>
  );
}

