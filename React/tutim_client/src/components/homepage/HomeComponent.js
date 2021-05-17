import React from 'react';
// import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, UncontrolledCarousel, Jumbotron} from 'reactstrap';
// import { Loading } from './LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {FadeTransform} from 'react-animation-components';
import {Jumbotron, UncontrolledCarousel} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';

// import local data
import './homepage.css';
import {TEXT} from '../../shared/basicText';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const picture = {
    chemical:'/assets/images/chemical.png',
    math:'/assets/images/math.png',
    physic:'/assets/images/physic.png'
}

const items = [
    {
      src: '/assets/images/teacher1.png',
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header',
      key: '1'
    },
    {
      src: '/assets/images/teacher2.png',
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: '/assets/images/teacher3.png',
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header',
      key: '3'
    }
];

const TopCourses = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Top Course"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Course Name
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Course description
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

function Home(props){
    return(
        <>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header justify-content-center grey">
                        <div className="col-12 col-sm-6 text-center">
                            <h1>Gia sư Việt</h1>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            {/* <hr/> */}
            <div className="container">
                <div className="row justify-content-center">
                    <h4 className="font-weight-bold">
                        Khóa học nổi bật
                    </h4>
                </div>             
                
                <Grid container spacing={2} justify="center">
                    <Grid item md={3}>
                        <TopCourses picture={picture.math} text={"Toán"}/>
                    </Grid>
                    <Grid item md={3}>
                        <TopCourses picture={picture.math} text={"Toán"}/>
                    </Grid>
                    <Grid item md={3}>
                    </Grid>
                </Grid>
            </div>
            {/* <hr/> */}
            <div className="container">
                <div className="row justify-content-center">
                    <h4 className="font-weight-bold">
                        Gia sư nổi bật
                    </h4>
                </div>
                <UncontrolledCarousel items = {items}/>
            </div>
           
        </>
    )
}

export default Home;

