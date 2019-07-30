import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function UserSources(props) {

  const classes = useStyles();

  const handleDelete = (sourceId) => props.deleteUserSource(sourceId)

  const handleClick = (sourceId) => props.addSourceIdToUserSources(sourceId)
  
  const logAllSources = () => props.allSources.map(source => {
    return (
        <Chip label={source.name} className={classes.chip} onClick={() => handleClick(source.id)} size="small" variant="outlined"/>
    )})

  const logSources = () => props.userSources.map(source => {
    return (
        <Chip label={source.name} className={classes.chip} onDelete={() => handleDelete(source.id)} color="primary" variant="default"/>
    )})


//   props.UserSources.map(source => console.log(source))

  return (
    <div>
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    <h1>Click on the tabs to customise your news feed</h1>
    {logSources()} 
    </div>
    <div>
    <h1>All Sources</h1>
    {logAllSources()}
    </div>
    </div>

  )
}
