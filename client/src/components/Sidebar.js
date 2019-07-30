import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeadlinesContainer from '../containers/HeadlinesContainer';
import Sidenav from './Sidenav'
import UserSources from './UserSources';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
}));

export default function Sidebar({displayType, loggedIn, location}){

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Sidenav loggedIn={loggedIn} />
      
      {location.pathname === '/user-sources'
      ?
        <UserSources loggedIn={loggedIn} />
      :
        <HeadlinesContainer 
          displayType={displayType}
          loggedIn={loggedIn}
        />
      }
    </div>
  );
}

