
import React from 'react'
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form,  Field } from "formik";
import ImageUploader from "react-images-upload";
import * as Yup from "yup"; 

import {connect} from 'react-redux';
import {updateProfile} from '../../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  updateProfile: (props)=>{dispatch(updateProfile(props))},
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
    },
    upload:{
        height:'100%',
        widht:'100%',
        backgroundColor:'#FF0000'
    }

}));



const validationSchema = Yup.object({   
    name: Yup.string()
        .required('This field is required')
        .max(36,'Maximum characters are 36'),
    email: Yup.string()
        .required('This field is required')
        .email('The email is invalid'),
    telnum: Yup.number()
        .typeError('you must specify a number')
        .positive('The number must be positive'),
});



const IntroModal = (props)=>{
    const classes = useStyles();
    const {name, email, telnum, description, updateProfile, closeModal} = props;

    const initialValues = {
        name: name,
        email: email,
        description: description,
        telnum: telnum,
        avatar:''
    }

    async function updateInfo(values){
        return await updateProfile(values);
    }


    const handleInput = (values)=>{   
        updateInfo(values);
        return closeModal();
    }


    const inputBar = ({field, form, type, label, errors, touched}) => {
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
            rows={5}
            rowsMax={5}
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
                buttonText="Change profile picture"
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
            onSubmit={handleInput}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            >             
            {({ errors, touched}) => (  
                <Form >
                    <Typography variant="h5" color="primary">Edit introduction</Typography>
                    <Grid container direction="row" spacing={3} >
                        <Grid item sm={12} md={3}>
                            <Field 
                                component={uploadFile}
                                name="avatar"
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
                                        component={inputBar}
                                        name="email"
                                        type="text"
                                        label="Email"
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Grid>

                                <Grid item>
                                    <Field 
                                        component={inputBar}
                                        name="telnum"
                                        type="text"
                                        label="Phone Number"
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

export default connect(null,mapDispatchToProps)(IntroModal);