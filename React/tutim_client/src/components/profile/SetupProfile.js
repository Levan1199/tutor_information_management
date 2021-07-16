import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Role from './Role';
import Information from './Information';
import Review from './Review';
import {Button}from '@material-ui/core';
import {Link} from 'react-router-dom';
 
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height:"100vh"
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }, 
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



const SetupProfile = (props) => {

  const classes = useStyles();
  const steps = ['Your role', 'Information', 'Confirmation'];
  const [activeStep, setActiveStep] = useState(0);

  var initialFields = {
    role:'',
    name:'',
    email:''
  }

  const [formValues, setFormValues] = useState(initialFields);
  const handleNext = (newValues) => {
    setFormValues({...formValues,...newValues});
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = (newValues) => {
    setFormValues({ ...formValues, ...newValues });
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Role {...formValues} handleBack={handleBack} handleNext={handleNext}/>;
      case 1:
        return <Information {...formValues} handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <Review review={formValues} handleBack={handleBack} handleNext={handleNext} {...props} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" className={classes.headerText}>
            Checkin
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Registeration Successfully
                </Typography>
                <Link to="/home">                
                      <Button variant="contained" color="primary"> Back to home page </Button>
                </Link>
              </React.Fragment>
            ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
            </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

export default SetupProfile;

