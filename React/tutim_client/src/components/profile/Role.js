import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio, FormControl, RadioGroup, Button } from '@material-ui/core';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
export default function Role(props) {
  const {role, handleNext } = props;
  const validationSchema = Yup.object({
    role: Yup.string()
        .required('This field is required')
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        You are:
      </Typography>
      <Grid container spacing={3}>
        <Formik initialValues={{role}}
        validationSchema={validationSchema}
        >
            {({submitForm, validateForm, setTouched, isSubmitting, values, setFieldValue, isValid, isInitialValid}) =>{
              isInitialValid=false;
            return (    
              <>
              <FormControl component="fieldset" fullWidth>
                <Form>
                  <RadioGroup row aria-label="position" name="role" defaultValue="top" onChange={(e)=>{
                    setFieldValue('role',e.target.value);
                    validateForm();
                  }}>
                    <Grid container justify="space-evenly">
                        <Grid item>
                            <FormControlLabel value="isStudent" control={<Radio color="primary" />} label="Student"/>
                        </Grid>
                        <Grid item>
                          <FormControlLabel value="isTeacher" control={<Radio color="primary" />} label="Teacher"/>
                        </Grid>
                    </Grid>
                    <ErrorMessage name="role"/>
                  </RadioGroup>
                  
              </Form>
              </FormControl>
              <Grid container row justify="flex-end">
                <Grid item>
                <Button variant="contained" color="primary"
                  onClick={
                    () => 
                    validateForm()
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
            );
            }}
        </Formik>
        </Grid>
    </React.Fragment>
  );
}