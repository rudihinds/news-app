import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../adapters/API'

const useStyles = makeStyles({
  card: {
    width: '100%'
  },
  media: {
    height: 300,
    backgroundSize: 'contain',
    marginTop: '20px'
  },
});

const HeadlineCard = ({ id, title, description, url, source, url_to_image, savedArticles, toggleSavedArticle, loggedIn}) => {
    
  const classes = useStyles();

  const saveArticle = () => {
    API.postUserArticle(id)
      .then(() => toggleSavedArticle(id))
  }

  const unsaveArticle = () => {
    API.deleteUserArticle(id)
    .then(() => toggleSavedArticle(id))
  }

  return (
    <Card className={classes.card}>
        <CardActionArea>
        {url_to_image &&
        <CardMedia
          className={classes.media}
          image={url_to_image}
          src={url_to_image}
          title={title}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {loggedIn ? <Button size="small" color="primary" onClick={savedArticles.includes(id) ? unsaveArticle : saveArticle}>
          {savedArticles.includes(id) ? 'Saved' : 'Save'}
        </Button> : ''}
        <Button size="small" color="primary" href={url}>
          Read More at {source.name}
        </Button>
      </CardActions>
    </Card>
 
  )
}

export default HeadlineCard;