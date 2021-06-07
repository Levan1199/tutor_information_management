import React from 'react';
import { Loading } from '../LoadingComponent';
import {courseUrl, avatarUrl} from '../../shared/baseUrl';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, Container,Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
// import local data
// import './homepage.css';

const useStyles = makeStyles((theme)=>({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  paperStyle:{
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    width: "100%",
    height: "100vh",
    backgroundImage:`url(${courseUrl}/header.jpg)`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover"
  },
  headerText:{
    fontWeight: "bold",
    fontFamily:"Roboto"
  },
  normalText:{
    fontFamily:"Segoe UI",
    fontWeight:"medium"
  },
  box:{
    width:"100%",
    padding:"20px 0",
    // backgroundColor:theme.palette.secondary.light
  },
  main:{
    backgroundColor:"#f5f5f5",
    padding:0
  },
  container:{
    padding:"20px 0px"
  }
}));

const styleTeacherInfo = makeStyles((theme)=>({
  root: {
    flexGrow: 1,    
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '80%',
    backgroundColor: "#f7e7e2"
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}));

const ComplexGrid = ({profile}) => {
  const classes = styleTeacherInfo();
  let subject = (profile.subject)?profile.subject.join(', '):"";
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} md={12}> 
        <Grid container justify="center" spacing={2}>
          <Grid item sm={2}>
            <div className={classes.image}>
              <img className={classes.img} alt="Teacher" src={avatarUrl+profile.imgPath} />
            </div>
          </Grid>
          <Grid item sm={10}  container>
            <Grid item sm container direction="column" spacing={2}>
              <Grid item sm>
                <Typography gutterBottom variant="h6">
                  {profile.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {subject}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.description}
                </Typography>
              </Grid>
              <Grid item>
                <Link  to={`/newInfo/${profile._id}`}>
                  <Button variant="contained" color="secondary">
                    More Information
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </div>
  );
}



const TopCourses = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={courseUrl+props.picture}
              title="Top Course"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to={`/teacherList/${props.name}`}>
            <Button variant="contained" color="primary">
              Register Now
            </Button>
            </Link>
          </CardActions>
        </Card>
      );
}

function Home(props){
    const classes = useStyles();
    if(props.isLoadingCourse){
      return (<Loading/>);
    }
    else{
    return(
        <>
        <Paper className={classes.paperStyle} variant="outlined">
          <Typography variant="h1" align="center" className={classes.headerText}>
            Tutor Information Management
          </Typography>
          <Typography variant="h2" align="center" className={classes.headerText}>
            A place for pupils and teachers
          </Typography>
        </Paper>
          <Container maxWidth="false" className={classes.main}>
            <Box className={classes.box}>
              <Typography variant="h4" align="center" className={classes.normalText}>
                  Lastest Courses
              </Typography>
              <Typography variant="body1" align="center" className={classes.normalText}>
                  Discover courses for all ages and exciting subjects
              </Typography>
            </Box>
            <Container maxWidth="lg" className={classes.container}>                
                <Grid item xs={12}>             
                  <Grid container spacing={2} justify="center">
                    {(()=>{
                        return props.courseInfo.map((course)=>{
                          if(course){
                            return (
                              <Grid item md={3}>
                                  <TopCourses name={course.name} picture={course.imgPath} description={course.description}/>
                              </Grid>
                            );
                          }
                        });
                    })()}
                  </Grid>
                </Grid>
            </Container>
            
            <Box className={classes.box}>
              <Typography variant="h4" align="center" className={classes.normalText}>
                Top Teachers
              </Typography>
              <Typography variant="body1" align="center" className={classes.normalText}>
                  Teachers have most possitive feedbacks
              </Typography>

            </Box>

            <Container maxWidth="lg" className={classes.container}>
                <Grid container justify="center" id="test" spacing={2}>
                  {(()=>{
                        const teachers = props.teacherRegs.slice(0,5);
                        return teachers.map((teacher)=>{
                          if(teacher){
                            return (
                              <Grid item xs={12}>
                                <ComplexGrid profile={teacher}/>
                              </Grid>
                            );
                          }
                        });
                    })()}                  
                </Grid>
            </Container>
          </Container>
        </>
    )}
}

export default Home;

