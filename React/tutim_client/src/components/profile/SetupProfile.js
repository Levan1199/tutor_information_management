import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Role from './Role';
import Information from './Information';
import Review from './Review';
import {Button, Grid}from '@material-ui/core';
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
}));



export default function SetupProfile(props) {
  console.log('inside setup profile');
  const classes = useStyles();
  const steps = ['Bạn là', 'Thông tin', 'Xác nhận'];
  const [activeStep, setActiveStep] = useState(0);
  var initialFields = {
    role:'',
    name:'',
    email:''
  }

  const [formValues, setFormValues] = useState(initialFields);
  var tempVal = '';
  const handleNext = (newValues) => {
    tempVal = newValues;
    setFormValues({...formValues,...newValues});
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = (newValues) => {
    tempVal = newValues;
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
        return <Review review={formValues} handleBack={handleBack} handleNext={handleNext} {...props}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
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
                  Bạn đã cập nhật thông tin thành công
                </Typography>
                <Link to="/home">                
                    <Grid container row justify="flex-end">
                    <Grid item >
                      <Link to="/newteacherInfo">
                      <Button variant="contained" color="primary"> Tới trang cá nhân </Button>
                      </Link>
                    </Grid>
                  </Grid>
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