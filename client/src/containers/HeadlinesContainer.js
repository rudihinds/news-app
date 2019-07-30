import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import { makeStyles } from '@material-ui/core/styles';

const HeadlinesContainer = ({headlines, savedArticles, toggleSavedArticle, hasNextPage, isNextPageLoading, loadNextPage}) => {
  const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  }));

  const classes = useStyles();

  window.onscroll = () => {
    if (isNextPageLoading || !hasNextPage) return;

    if (
      window.innerHeight + document.documentElement.scrollTop + 2500
      >= document.documentElement.offsetHeight
    ) {
      loadNextPage();
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
          {headlines.map(headline => (
            <React.Fragment key={headline.id}>
              <br />
              <div style={{ display: 'flex', width: '50vw' }}>
              <HeadlineCard key={headline.id} {...headline} savedArticles={savedArticles} toggleSavedArticle={toggleSavedArticle}/>
              </div>
            </React.Fragment>
          ))}
          <br />
          {isNextPageLoading &&
            <div>Loading...</div>
          }
          {(!hasNextPage &&  document.documentElement.scrollTop > 1000) &&
            <div>You did it! You reached the end!</div>
          }
    </main>
  )
}

export default HeadlinesContainer;