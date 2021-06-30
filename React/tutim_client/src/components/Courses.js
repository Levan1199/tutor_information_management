import React, { useEffect } from 'react';
import {courseUrl} from '../shared/baseUrl';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Container,Box, Button} from '@material-ui/core';
import {Loading} from './LoadingComponent';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCourseInfo} from '../redux/ActionCreators'; 


const mapStatetoProps = state =>{
  return{
    courseInfo: state.courseInfo,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchCourseInfo:()=>{dispatch(fetchCourseInfo())},
})
 


const useStyles = makeStyles((theme)=>({
root: {
    flexGrow: 1,    
    },
media: {
    height: 140,
  },
  container:{
      padding:"20px 0px"
  }, 
  paper:{
    minHeight:"400px",
    maxHeight:"400px",
    maxWidth:"700px",
    width:"700px",
    margin:"20px 0px"
  },
  main:{
      backgroundColor:"#f5f5f5",
      padding:0,
      minHeight:"100vh"
  },
  box:{
      width:"100%",
      padding:"20px 0",
      backgroundColor:theme.palette.secondary.light
  },
  normalText:{
    fontFamily:"Segoe UI",
    fontWeight:"medium",
    fontSize:"1.2rem"
  },
  headerText:{
      fontWeight: "bold",
      fontFamily:"Roboto",
      color: theme.palette.primary.dark
  },
   
}));

const CoursesRender = (props) => {
    const {name, imgPath} = props.course;
    const classes = useStyles();
    const history = useHistory();
    const handleClick = () =>{
    history.push(`/courseDetail/${name}`)
  }
  return (
      <Card className={classes.root}>
          <CardActionArea onClick={handleClick}>
            <CardMedia
              className={classes.media}
              image={courseUrl+imgPath}
              title="Top Course"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>              
            </CardContent>
          </CardActionArea>
        
        <CardActions onClick={handleClick}>
          <Button variant="contained" color="primary">
            More Information
          </Button>
        </CardActions>
      </Card>
    );
}

const Courses = (props) => {
    const classes = useStyles();
    useEffect(()=>{
      if(props.courseInfo.courseInfo.length == 0)
      {
        props.fetchCourseInfo();
      }
      return
    },[]);
    if(props.courseInfo.isLoadingCourse){
      return (<Loading/>);
    }
    else{
    return(    
        <Container maxWidth={false} className={classes.main}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" className={classes.normalText}>
                    Courses
                </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                    Discover courses for all ages and exciting subjects
                </Typography>
            </Box>
            <Container maxWidth="lg" className={classes.container}>                
              <Grid container spacing={2} justify="center">
              {(()=>{
                  return props.courseInfo.courseInfo.map((course, index)=>{
                      if(course){
                      return (
                          <Grid item xs={3} key={index}>
                              <CoursesRender course={course}/>
                          </Grid>
                      );
                    }
                    else{
                      return "";
                    }
                  });
              })()}
              </Grid>
            </Container>
        </Container>
            
    )}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Courses);

