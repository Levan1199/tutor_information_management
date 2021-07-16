import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

const useStyles = makeStyles(() => ({
  form:{
    padding:'20px'
  },
}));

export default function Information(props) {
  const classes = useStyles();
  const {name, email, handleBack, handleNext } = props;
  const validationSchema = Yup.object({
    name: Yup.string()
        .required('This field is required'),
    email: Yup.string()
          .email('Email wrong syntax')
          .required('This field is required')
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information
      </Typography>
      <Grid container spacing={3}>
        <Formik initialValues={{name,email}}
        validationSchema={validationSchema}
        >
            {({validateForm, setTouched, values, setFieldValue}) => (    
              <>
                <FormControl component="fieldset" fullWidth>
                <Form>
                <Grid container spacing={3} className={classes.form}>
                  <Grid item xs={12} fullWidth>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Full name"
                      fullWidth
                      autoComplete="cc-csc"
                      onChange={(e)=>{
                        setFieldValue('name',e.target.value);
                      }}
                    />
                    <ErrorMessage name="name"/>
                  </Grid>
                  <Grid item xs={12} fullWidth>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="cc-csc"
                      onChange={(e)=>{
                        setFieldValue('email',e.target.value);
                      }}
                    />
                    <ErrorMessage name="email"/>
                  </Grid>
                </Grid>
              </Form>
              </FormControl>
              <Grid container row justify="flex-end">
                <Grid item >
                  <Button onClick={() => { handleBack(values) } }> Back </Button>
                </Grid>
                <Grid item>
                <Button variant="contained" color="primary" 
                  onClick={
                    () => validateForm()
                      .then((errors) => {                        
                        if(Object.entries(errors).length === 0 && errors.constructor === Object ) {
                          handleNext(values);
                        } else {
                          setTouched(errors);
                        }
                      })
                  } >
                  Next
                </Button>
                </Grid>
              </Grid>        
            </>
            )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
}