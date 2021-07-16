
import React from 'react'
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form,  Field } from "formik";
import ImageUploader from "react-images-upload";
import * as Yup from "yup"; 
import {connect} from 'react-redux';
import {updateCourse} from '../../redux/ActionCreators';
import {useHistory} from 'react-router-dom';

  const mapDispatchToProps = dispatch => ({
    updateCourse:(course)=>{dispatch(updateCourse(course))},
  })

const useStyles = makeStyles(theme => ({
    paperStyle:{
        padding :20,
        width:"60%", 
        margin:"20px auto",
    },
    icon:{
        backgroundColor: theme.palette.primary.main
    },
    btn:{
        marginTop: '15px',
        backgroundColor: theme.palette.secondary.light,
        variant:'contained'
    },
    inputBar:{
        marginTop:0,
        marginBottom:'10px'
    },
    label:{
        fontWeight: 'medium',
        color: theme.palette.primary.dark
    }

}));

const validationSchema = Yup.object({   
    name: Yup.string()
        .required('This field is required'), 
    description: Yup.string()
        .required('This field is required')
});




const EditCourse = (props)=>{
    const classes = useStyles();
    const {closeModal, course, updateCourse} = props;
    
    const history = useHistory();
    const initialValues = {
        name: course.name,
        description: course.description,
        courseImg:""
    }

    const handleInput = (values, actions,  closeModal)=>{   
        values.prevName = course.name;
        updateCourse(values);
        history.push("/courseDetail/"+values.name);
        return closeModal();
    }

    const inputBar = ({field, form, type, label,errors, touched}) => {
        const {name} = field;
        const helpText = "Input " + label;
        const initialValue = form.values[name];
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
             defaultValue={initialValue}
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            error={touched[name] && Boolean(errors[name])}
            helperText={errors[name]}
            />
            </>
        );
    }

    const inputTextArea = ({field, form, type, label, errors, touched}) => {
        const {name} = field;
        const helpText = "Input " + label;
        const initialValue = form.values[name];
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
            defaultValue={initialValue}
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            error={touched[name] && Boolean(errors[name])}
            helperText={errors[name]}
            multiline
            rows={7}
            rowsMax={7}
            />
            </>
        );
    }

    const uploadFile = ({field, form, type, ...props}) => {
        const {name} = field;
        return (
            <ImageUploader
                withIcon={false}
                height="100%"
                withPreview={true}
                singleImage={true}
                label=""
                buttonText="Change course picture"
                onChange={(pic)=>form.setFieldValue(name, pic[0])}
                imgExtension={[".jpg", ".gif", ".png","jpeg"]}
                maxFileSize={1048576}
                fileSizeError=" file size is too big or wrong extension"
          />
       
        );
    }

    return(
        <Paper elevation={10} className={classes.paperStyle}>
            <Formik 
            initialValues={initialValues}
            onSubmit={ (values, actions) => handleInput(values, actions, closeModal) }
            validationSchema={validationSchema}
            >               
             {({ errors, touched}) => (  
                <Form >
                <Typography variant="h5" color="primary">Edit Course Information</Typography>
                <Grid container direction="row" spacing={3} >
                        <Grid item sm={12} md={3}>
                            <Field 
                                component={uploadFile}
                                name="courseImg"
                                type="file"
                            />
                        </Grid>
                        <Grid item sm={12} md={8}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Field 
                                        component={inputBar}
                                        name="name"
                                        type="text"
                                        label="Full name"
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Grid>                          

                                <Grid item>
                                    <Field 
                                        component={inputTextArea}
                                        name="description"
                                        type="text"
                                        label="Description"
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row"  justify="space-evenly">
                        <Grid md={4} item>
                            <Button className={classes.btn} type="submit" fullWidth>Save</Button>
                        </Grid>
                        <Grid md={4} item>
                            <Button className={classes.btn} onClick={props.closeModal} fullWidth>Cancel</Button>
                        </Grid>
                    </Grid>                
                </Form>
            )}
            </Formik>
        </Paper>           
    );
}

export default  connect(null, mapDispatchToProps)(EditCourse);