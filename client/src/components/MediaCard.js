import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}







// import React from 'react'
// // import 'semantic-ui-css/semantic.min.css'
// // import { Grid, Image } from 'semantic-ui-css/semantic.min.css'
// import { Card, Icon, Image } from 'semantic-ui-css/semantic.min.css'


// class GridExample extends React.Component{

// render(){

//   return (
//   <Card>
//     <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
//     <Card.Content>
//       <Card.Header>Matthew</Card.Header>
//       <Card.Meta>
//         <span className='date'>Joined in 2015</span>
//       </Card.Meta>
//       <Card.Description>
//         Matthew is a musician living in Nashville.
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name='user' />
//         22 Friends
//       </a>
//     </Card.Content>
//   </Card>
// )
//   }}

// export default GridExample


// //     <Grid celled>
// //     <Grid.Row>
// //       <Grid.Column width={3}>
// //         <Image src='/images/wireframe/image.png' />
// //       </Grid.Column>
// //       <Grid.Column width={13}>
// //         <Image src='/images/wireframe/centered-paragraph.png' />
// //       </Grid.Column>
// //     </Grid.Row>

// //     <Grid.Row>
// //       <Grid.Column width={3}>
// //         <Image src='/images/wireframe/image.png' />
// //       </Grid.Column>
// //       <Grid.Column width={10}>
// //         <Image src='/images/wireframe/paragraph.png' />
// //       </Grid.Column>
// //       <Grid.Column width={3}>
// //         <Image src='/images/wireframe/image.png' />
// //       </Grid.Column>
// //     </Grid.Row>
// //   </Grid>
// //   )
// // }
// // }