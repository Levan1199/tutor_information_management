import React, {useEffect} from 'react';
import {courseUrl} from '../shared/baseUrl';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Container,Box, Button,  Divider} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Loading} from './LoadingComponent';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCourseDetail} from '../redux/ActionCreators'
// import local data
const mapStatetoProps = state =>{
  return{
    courseInfo: state.courseInfo,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchCourseDetail:(name)=>{dispatch(fetchCourseDetail(name))},
})
 



const useStyles = makeStyles((theme)=>({
  
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

const CourseDetail = (props) => {
  const classes = useStyles(); 
  const {courseInfo, courseName, fetchCourseDetail} = props;
  useEffect(()=>{
    if(courseInfo.courseInfo.length == 0)
      {
        fetchCourseDetail(courseName);
      }
  },[]);

  if(props.courseInfo.isLoading){
    return <Loading/>;
  }
  else{
    const courses = props.courseInfo.courseInfo;
    const course = courses.filter((course)=>course.name===props.courseName)[0];
    const name = (course)?course.name.toUpperCase():"";
    return(
      <Container maxWidth="false" className={classes.main}>
        <Box className={classes.box}>
            <Typography variant="h4" align="center" className={classes.headerText}>
                {name} COURSE
            </Typography>        
        </Box>
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1} justify="center">

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="h5" align="left" className={classes.headerText}>
                    Start learning {course.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link to={`/teacherList/${course.name}`}>
                  <Button variant="contained" color="primary">
                    Register Now
                  </Button>
                  </Link>
                </Grid>
              </Grid>
              <Divider style={{margin: "10px 0px 0px"}}/>        
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" align="center" className={classes.normalText}>
                {course.description}
              </Typography>
            </Grid>

            <Paper variant="outlined" className={classes.paper}>
              <img alt="course ava" src={`${courseUrl}${course.imgPath}`} width="100%" height="100%" />
            </Paper>
           
          </Grid>
      </Container>
      </Container>
    )}
}

export default  connect(mapStatetoProps, mapDispatchToProps)(CourseDetail);

