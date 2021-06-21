import React from 'react';
import { Loading } from '../LoadingComponent';
import {courseUrl, avatarUrl} from '../../shared/baseUrl';
import { makeStyles } from '@material-ui/core/styles';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid, Container,Box, Divider} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
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
    backgroundColor:theme.palette.secondary.light
  },
  main:{
    backgroundColor:"#f5f5f5",
    padding:0,
    minHeight:"100vh"
  },
  container:{
    padding:"20px 0px"
  }, 
}));


const ComplexGrid = ({profile, remove}) => {
  const classes = useStyles();
  let subject = (profile.subject)?profile.subject.join(', '):"";
  const handleClick = () => {
    const obj = {studentId: profile._id}
    return remove(obj);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} md={12}> 
        <Grid container justify="center" spacing={2}>
          <Grid item sm={2}>
            <div className={classes.image}>
              <img className={classes.img} alt="Teacher" src={avatarUrl+profile.imgPath} />
            </div>
          </Grid>
          <Grid item sm={8}  container>
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
                <Link  to={`/profile/${profile._id}`}>
                  <Button variant="contained" color="secondary">
                    More Information
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Button variant="contained" color="secondary" onClick={handleClick}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Paper>
      </div>
  );
}




function RegisteredList(props){
    const classes = useStyles();
    if(props.isLoading){
      return (<Loading/>);
    }   
    else{
    return(
        <Container maxWidth={false} className={classes.main}>                    
            <Box className={classes.box}>
              <Typography variant="h4" align="center" className={classes.normalText}>
                Your list of registed teachers
              </Typography>          
            </Box>

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <Grid item>
                            <Link to={`/profile`}>
                                <Button variant="contained" color="primary">
                                    Back to your Profile <SubdirectoryArrowLeftIcon/>
                                </Button>
                            </Link>
                        </Grid>
                        <Divider style={{margin: "10px 0px 0px"}}/>        
                    </Grid>                 

                </Grid>
                <Grid container justify="center" spacing={2}>
                  {(()=>{
                        const list = props.awaiting;                      
                        return list.map((student)=>{
                          if(student){
                            return (
                              <Grid item xs={12} key={student._id}>
                                <ComplexGrid profile={student.studentId} remove={props.remove}/>
                              </Grid>
                            );
                          }
                        });
                    })()}                  
                </Grid>
            </Container>
        </Container>
    )}
}

export default RegisteredList;

