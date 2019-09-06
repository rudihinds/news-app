import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Redirect } from 'react-router-dom'

const SearchForm = ({searchTerm, handleChange, redirectSubmit, setRedirectSubmit}) => {
  
  const useStyles = makeStyles(theme => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.black, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }, 
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  }));

  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();
    setRedirectSubmit(true)
    setTimeout(function(){ setRedirectSubmit(false) }, 1000);
  }

  if (redirectSubmit === true) {
    const searchString = `q=${searchTerm.replace(/[^\w\s]/gi, '').split(' ').join('_')}`
    return <Redirect push to={{pathname: "/search-results", search: searchString}}  />
  }

  return (
    <div className={classes.search}>
      <form onSubmit={e => handleSubmit(e)}>
        <div className={classes.searchIcon}>
          <SearchIcon type='submit'/>
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => handleChange(e.target.value)}
          value={searchTerm}
        />
        <button type='submit' style={{position: 'absolute', visibility: 'hidden'}} />
      </form>
    </div>
  )
}

export default SearchForm;