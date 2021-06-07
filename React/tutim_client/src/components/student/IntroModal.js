
import React from 'react'
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
import ImageUploader from "react-images-upload";
import * as Yup from "yup"; 

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
        .required('This field is required')
        .max(36,'Maximum characters are 36'),
    email: Yup.string()
        .required('This field is required')
        .email('The email is invalid')
        .max(200,'Maximum characters are 200'),
    description: Yup.string()
        .max(200,'Maximum characters are 200'),
});






const handleInput = (values, actions, updateProfile, closeModal)=>{   
    updateProfile(values);
    return closeModal();
}

const IntroModal = (props)=>{
    const classes = useStyles();
    const {name, email, description} = props;
    const initialValues = {
        name: name,
        email: email,
        description: description,
        avatar:''
    }


    const inputBar = ({field, form, type, label,errors, touched}) => {
        const {name} = field;
        const helpText = "Input " + label;
        const initialValue = form.values[name];
        console.log(errors[name], touched);
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
            onSubmit={ (values, actions) => handleInput(values, actions, props.updateProfile, props.closeModal) }
            validationSchema={validationSchema}
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

export default IntroModal