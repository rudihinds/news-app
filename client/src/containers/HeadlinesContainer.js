import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import { makeStyles } from '@material-ui/core/styles';


const HeadlinesContainer = ({headlines}) => {
  const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    }
  }));

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
          {headlines.map(headline => <HeadlineCard key={headline.id} {...headline}/>)}
    </main>
  )
}

export default HeadlinesContainer;