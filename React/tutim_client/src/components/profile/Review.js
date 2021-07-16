import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import {connect} from 'react-redux';
import {postProfile} from '../../redux/ActionCreators'

const mapDispatchToProps = dispatch => ({
  postProfile: (props)=>{dispatch(postProfile(props))},
})
 
const useStyles = makeStyles(theme => ({
  
  normalText:{
    fontFamily:"Segoe UI",
    fontWeight:"medium",
    fontSize:"1.5rem"
  },
  headerText:{
  fontWeight: "bold",
  fontFamily:"Roboto",
  color:theme.palette.primary.main
},
}));

const Review = (props) => {
  const classes = useStyles();
  const {postProfile} = props;
  const {review, handleBack, setActiveStep, activeStep } = props;
  const {role, name, email} = review;
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom className={classes.headerText}>
        Confirmation
      </Typography>
      <Grid container row>
          <Grid item xs={12}>
              <Typography gutterBottom variant="h6" className={classes.normalText}><b>You are: </b>{role==='isTeacher'?'Teacher':'Student'} </Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography gutterBottom variant="h6" className={classes.normalText}><b>Full name: </b>{name} </Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography gutterBottom variant="h6" className={classes.normalText}><b>Email: </b>{email} </Typography>
          </Grid>
      </Grid>
      <Grid container row justify="flex-end">
        <Grid item >
            <Button onClick={() => { handleBack() } }> Back </Button>
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" 
          onClick={()=> {
            postProfile({name,email,role});
            return setActiveStep(activeStep + 1);
          }}
        >
          Save
        </Button>
        </Grid>
      </Grid> 
    </React.Fragment>
  );
}


export default connect(null,mapDispatchToProps)(Review);