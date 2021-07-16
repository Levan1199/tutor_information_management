import React, { useEffect } from 'react';
import { Loading } from './LoadingComponent';
import {courseUrl, avatarUrl, homeUrl} from '../shared/baseUrl';
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
import {useHistory, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCourseInfo, fetchTeacherReg} from '../redux/ActionCreators';
import StarIcon from '@material-ui/icons/Star';

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    courseInfo: state.courseInfo,
    profiles: state.profiles,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchCourseInfo:()=>{dispatch(fetchCourseInfo())},
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
})
 




const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,    
  },

  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',   
  }, 

  media: {
    height: 0,
    paddingTop: '56.25%',
    marginTop:'30'
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
  },
  main:{
    backgroundColor:"#f5f5f5",
    padding:0
  },
  container:{
    padding:"20px 0px"
  }, 


  infoSection:{
    padding:"20px 0px",    
    backgroundColor: theme.palette.secondary.light
  },
  infoImg: {
    width: "100%",
    height: 128,
  },
  infoGrid:{
    maxWidth:"960px"
  },

  cplxRoot:{
    display: 'flex',
    
  },
  cplxContent: {
    flex: '1 0 auto',
  },
  cplxCover: {
    width: 151,
    maxWidth:151,    
  },
  cplxDetails: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight:"200px",
    minHeight:"200px",
    width:"100%",
    backgroundColor:theme.palette.secondary.light  
  },
}));

const StarRating = ({rating}) => {      
  const classes = useStyles();
  return (
      <>
          {[...Array(5)].map((star, i)=>{
              const ratingValue = i+1;
              return (
                  <>
                    <StarIcon className={classes.star}
                    style={{fill: ratingValue <= (rating) ? "#ffc107":"#e4e5e9"}}
                    />
                  </>
              )
          })}  
      </>
  );
}

const ComplexGrid = (props) => {
  const {profile} = props;
  const classes = useStyles();
  let history = useHistory();
  let subject = (profile.subject)?profile.subject.join(', '):"";

  const rating = profile.rate/profile.commentCount;


  const handleClick = () =>{
    history.push(`/profile/teacher/${profile._id}`)
  }
  return (
      <Card className={classes.cplxRoot}>
        <CardMedia
          className={classes.cplxCover}
          image={avatarUrl+profile.imgPath}
          title="Top Course"
        />
        <div className={classes.cplxDetails}>
        <CardContent className={classes.cplxContent}> 
          <Typography  variant="subtitle1" className={classes.headerText}>
            {profile.name}
          </Typography>       
          <StarRating rating={rating}/>
          <Typography  variant="subtitle2" >
            {subject}
          </Typography>  
          <Button  onClick={handleClick} variant="contained" color="primary">
            More Information
          </Button>      
        </CardContent>
        </div>           
      </Card>
    );
}



const TopCourses = (props) => {
    const {name, imgPath} = props.course;
    const classes = useStyles();
    let history = useHistory();


    const handleClick = () =>{
      history.push(`/courseDetail/${name}`)
    }
    return (
        <Card>
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

function Home(props){
  const {fetchCourseInfo, fetchTeacherReg, profiles} = props;
  let history = useHistory();
  let location = useLocation();
  const hcmut = "Trường+Đại+học+Bách+khoa+-+Đại+học+Quốc+gia+TP.HCM";
  useEffect(()=>{
    async function fetchData(){
      await fetchCourseInfo();
     return await fetchTeacherReg();
    }
    fetchData();
  },[]);

  useEffect(()=>{
    if (profiles.isEmpty && location.pathname !== '/stepper'){
      history.push('/stepper');
    }
  },[profiles]);

    const classes = useStyles();
    if(props.courseInfo.isLoading || props.teacherRegs.isLoading){
      return (<Loading/>);
    }
    else{
    return(
        <>
        <Paper className={classes.paperStyle} variant="outlined">
          <Typography color="primary" variant="h1" align="center" className={classes.headerText}>
            GET STUDY
          </Typography>
          <Typography color="primary" variant="h2" align="center" className={classes.headerText}>
            A place for pupils and teachers
          </Typography>
        </Paper>

        <Container maxWidth={false} className={classes.main}>
          <Container maxWidth={false} className={classes.infoSection}>
            <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h2" align="center" className={classes.headerText}>
                    This can be the starting place
                  </Typography>
                  <Typography variant="h4" align="center" className={classes.normalText}>
                    Natural science and mathematics, English, Art talent training and soft skills development for children will help your child make great progress and find a passion for discovering the world.
                  </Typography>
              </Grid>

              <Grid item xs={12} md={4} justify="center">
                <div className={classes.infoImg}>
                  <img className={classes.img} alt="Teacher" src={homeUrl+"art.png"} />                  
                </div>
                <Typography variant="h6" align="center" className={classes.headerText}> ART </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                  Painting, Chess, siging in English, Modern Dancing, Dancing, Ukulele, Piano... improve creativity, intelligence and train children's body flexibility.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.infoImg}>
                  <img className={classes.img} alt="Teacher" src={homeUrl+"language.png"} />
                </div>
                <Typography variant="h6" align="center" className={classes.headerText}> LANGUAGE </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                 Learning a new language means your brain has to cope with complexity as it makes sense of and absorbs new patterns. As our brains work out the meaning, endeavoring to communicate, we develop key learning skills such as cognitive thinking and problem-solving.

                </Typography>
              </Grid>
              <Grid item xs={12} md={4}> 
                <div className={classes.infoImg}>
                  <img className={classes.img} alt="Teacher" src={homeUrl+"softskill.png"} />
                </div>
                <Typography variant="h6" align="center" className={classes.headerText}> SOFT SKILLS </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                  Soft skills are attributes that help determine how we approach our work and also how we work with others. Soft skills pump up the curious minds to act and make the path to success    
                </Typography>
              </Grid>
            </Grid>
          </Container>
          </Container>

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
                      const length = props.courseInfo.courseInfo.length;
                        const courses = props.courseInfo.courseInfo.slice(length-8,length);
                        return courses.map((course)=>{
                          if(course){
                            return (
                              <Grid item md={3} key={course._id}>
                                  <TopCourses course={course}/>
                              </Grid>
                            );
                          }
                          else return <Loading/>
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
                <Grid container justify="center" spacing={2}>
                  {(()=>{
                        const compare = (a,b) => {
                          if ( a.rate/a.commentCount < b.rate/b.commentCount ){
                            return -1;
                          }
                          if ( a.rate/a.commentCount > b.rate/b.commentCount ){
                            return 1;
                          }
                          return 0;                         
                        }

                        let teachers = props.teacherRegs.teacherRegs;
                        teachers = teachers.sort(compare);
                        teachers = teachers.reverse().slice(0,6);
                        return teachers.map((teacher,idx)=>{                                                 
                          if(teacher){
                            return (
                              <Grid item xs={4} key={idx}>
                                <ComplexGrid profile={teacher}/>
                              </Grid>
                            );
                          }
                          else return <Loading/>
                        });
                    })()}                  
                </Grid>
            </Container>

            <Container maxWidth={false}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" className={classes.headerText}>
                  CENTER ADDRESS
                </Typography>                
            </Box>
            <Container maxWidth="lg" className={classes.container}>                           
                <iframe
                    title="Map in HCMC"
                    width="100%"
                    height="500px"               
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAbCn05e2EtWsNxQzUeEvaNCGU3oTvpmsQ&q=${hcmut}`}>
                </iframe>
            </Container>
          </Container>

          </Container>
        </>
    )}
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);

