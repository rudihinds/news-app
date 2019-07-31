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
  const [redirectSubmit, setRedirectSubmit] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('')
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Sidenav loggedIn={loggedIn} searchTerm={searchTerm} handleChange={setSearchTerm} redirectSubmit={redirectSubmit} setRedirectSubmit={setRedirectSubmit}/>
      
      {location.pathname === '/user-sources'
      ?
        <UserSources loggedIn={loggedIn} />
      :
        <HeadlinesContainer 
          displayType={displayType}
          loggedIn={loggedIn}
          search={location.search.slice(1)}
          setRedirectSubmit={setRedirectSubmit}
        />
      }
    </div>
  );
}

