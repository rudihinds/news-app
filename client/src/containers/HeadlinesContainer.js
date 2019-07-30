import React from 'react'
import HeadlineCard from '../components/HeadlineCard'
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

const HeadlinesContainer = ({headlines, savedArticles, toggleSavedArticle, hasNextPage, isNextPageLoading, loadNextPage}) => {
  const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    }
  }));

  const classes = useStyles();

  const isItemLoaded = index => !hasNextPage || index < headlines.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const itemCount = hasNextPage ? headlines.length + 1 : headlines.length;

  const Item = ({ index, style }) => {
    console.log('index: ',index)
    console.log('headline: ',headlines[index])

    let content;
    if (!isItemLoaded(index)) {
      return <div style={style}>"Loading..."</div>
    } else {
      return <div style={style}><HeadlineCard key={headlines[index].id} {...headlines[index]} savedArticles={savedArticles} toggleSavedArticle={toggleSavedArticle}/></div>
    }
  };

  return (
    <main className={classes.content}>
       <div className={classes.toolbar} />
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={10000}
            width={'75vw'}
            itemSize={500}
            itemCount={itemCount}
            onItemsRendered={onItemsRendered}
            ref={ref}
            threshold={5}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </main>
  );

  // return (
  //   <main className={classes.content}>
  //     <div className={classes.toolbar} />
  //         {headlines.map(headline => <HeadlineCard key={headline.id} {...headline} savedArticles={savedArticles} toggleSavedArticle={toggleSavedArticle}/>)}
  //   </main>
  // )
}

export default HeadlinesContainer;