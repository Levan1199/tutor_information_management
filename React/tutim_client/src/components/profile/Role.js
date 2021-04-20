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
        .required('Bạn cần điền mục này')
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Bạn là:
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
                    console.log('valid: ',isValid);
                  }}>
                    <Grid container justify="space-evenly">
                        <Grid item>
                            <FormControlLabel value="isStudent" control={<Radio color="primary" />} label="Học sinh"/>
                        </Grid>
                        <Grid item>
                          <FormControlLabel value="isTeacher" control={<Radio color="primary" />} label="Gia sư"/>
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
                          console.log('inside valid',values);
                          handleNext(values);
                        } else {
                          setTouched(errors);
                        }
                      }) 
                  } >
                  Tiếp theo
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