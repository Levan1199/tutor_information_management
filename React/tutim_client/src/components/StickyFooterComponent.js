import React from 'react';
// import {courseUrl, avatarUrl} from '../../shared/baseUrl';
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

const useStyles = makeStyles((theme)=>({
  text:{
    fontWeight: "bold",
    fontSize: "30px",
    color: theme.palette.primary.dark
  },
  container:{
      padding:"20px 0px"
  },
  header:{
      paddingBottom: "10px"
  },
  button:{
      height:"50px",
      width:"75px"
  } ,
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
    fontSize:"1.5rem"
  },
  headerText:{
      fontWeight: "bold",
      fontFamily:"Roboto",
      color: theme.palette.primary.dark
  },

  cardcontent: {
  "&:last-child": {
    paddingTop: 0
  }
  }
}));



function Home(props){
    const classes = useStyles();
    if(props.isLoadingCourse){
      return <div></div>;
    }
    else{
    return(
      <Container maxWidth="false" className={classes.main}>
        <Box className={classes.box}>
            <Typography variant="h4" align="center" className={classes.normalText}>
                Current classes
            </Typography>
            <Typography variant="body1" align="center" className={classes.normalText}>
                Current classes that is in need of teachers requested by students 
            </Typography>
        </Box>
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            
          </Grid>
      </Container>
      </Container>
    )}
}

export default Home;

