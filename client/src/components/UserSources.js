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
    <h1>My Sources</h1>
    {logSources()} 
    </div>
    <div>
    <h1>All Sources</h1>
    {logAllSources()}
    </div>
    </div>

  )
}
    // <div className={classes.root} onClick={logSources}>
    //   <Chip label="Basic Chip" className={classes.chip} />
    //   <Chip
    //     avatar={<Avatar>MB</Avatar>}
    //     label="Clickable Chip"
    //     onClick={handleClick}
    //     className={classes.chip}
    //   />
    //   <Chip
    //     avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
    //     label="Deletable Chipieeee"
    //     onDelete={logAllSources}
    //     onClick={logSources}
    //     className={classes.chip}
    //   />
    //   <Chip
    //     // avatar={
    //     //   <Avatar>
    //     //     <FaceIcon />
    //     //     </Avatar>
    //     // }
    //     label="Clickable Deletable Chippr"
    //     onClick={logSources}
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //   />
    //   <Chip
    //     icon={<FaceIcon />}
    //     label="Clickable Deletable Chip"
    //     onClick={handleClick}
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //   />
    //   <Chip
    //     label="Custom delete icon Chip"
    //     onClick={handleClick}
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //     deleteIcon={<DoneIcon />}
    //   />
    //   <Chip
    //     label="Clickable Link Chip"
    //     className={classes.chip}
    //     component="a"
    //     href="#chip"
    //     clickable
    //   />
    //   <Chip
    //     avatar={<Avatar>MB</Avatar>}
    //     label="Primary Clickable Chip"
    //     clickable
    //     className={classes.chip}
    //     color="primary"
    //     onDelete={handleDelete}
    //     deleteIcon={<DoneIcon />}
    //   />
    //   <Chip
    //     icon={<FaceIcon />}
    //     label="Primary Clickable Chip"
    //     clickable
    //     className={classes.chip}
    //     color="primary"
    //     onDelete={handleDelete}
    //     deleteIcon={<DoneIcon />}
    //   />
    //   <Chip
    //     label="Deletable Primary Chip"
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //     color="primary"
    //   />
    //   <Chip
    //     avatar={
    //       <Avatar>
    //         <FaceIcon />
    //       </Avatar>
    //     }
    //     label="Deletable Secondary Chip"
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //     color="secondary"
    //   />
    //   <Chip
    //     icon={<FaceIcon />}
    //     label="Deletable Secondary Chip"
    //     onDelete={handleDelete}
    //     className={classes.chip}
    //     color="secondary"
    //   />
      
    // </div>
//   );



