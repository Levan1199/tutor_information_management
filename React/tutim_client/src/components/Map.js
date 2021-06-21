import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Container,Box, TextField} from '@material-ui/core';
import {Loading} from './LoadingComponent';

// import local data

const useStyles = makeStyles((theme)=>({
root: {
    flexGrow: 1,    
  },
  container:{
      padding:"20px 0px"
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
  textField:{
    margin: "5px 0px 25px",
    color: theme.palette.primary.dark
  }
}));


const Courses = (props) => {
    const classes = useStyles();
    const [location, setLocation] = useState("Trường+Đại+học+Bách+khoa+-+Đại+học+Quốc+gia+TP.HCM");

    useEffect(()=>{
        if(props.address != undefined){
            setLocation(props.address);
        }
    },[]);

    useEffect(()=>{
        if(location === ""){
            setLocation("Trường+Đại+học+Bách+khoa+-+Đại+học+Quốc+gia+TP.HCM");
        }
    });

    if(props.isLoadingCourse){
      return (<Loading/>);
    }
    else{
    return(    
        <Container maxWidth={false} className={classes.main}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" className={classes.headerText}>
                    Map
                </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                    Find the address
                </Typography>
            </Box>
            <Container maxWidth="lg" className={classes.container}>   
                         
              <Grid container spacing={2} justify="center">                  
                <TextField
                    className={classes.textField}
                    id="filled-full-width"
                    label="Find location"
                    placeholder="Input the location"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(event)=>{setLocation(event.target.value)}}
                />
              </Grid>
                <iframe
                    width="100%"
                    height="500px"               
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAbCn05e2EtWsNxQzUeEvaNCGU3oTvpmsQ&q=${location}`}>
                </iframe>
            </Container>
        </Container>
            
    )}
}

export default Courses;

