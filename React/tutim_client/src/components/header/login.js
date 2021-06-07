
import React,{useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup"; 

const useStyles = makeStyles(theme => ({
    paperStyle:{
        padding :20,
        height:'50vh',
        width:280, 
        margin:"20px auto",
    },
    icon:{
        backgroundColor: theme.palette.primary.main
    },
    btn:{
        marginTop: '15px',
        backgroundColor: theme.palette.primary.main,
        variant:'contained'
    }

}));

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),

    password: Yup.string()
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),
});



const inputBar = ({field, form, type, ...props}) => {
    const {name} = field;
    const helpText = "please input " + name;
    return (
        <>
        <TextField type={type} name={name} placeholder={helpText} fullWidth margin="normal"
        onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
        />
        <ErrorMessage name={name}/>
        </>
    );
}

const handleInput = (values, actions, loginUser, closeModal)=>{    
    loginUser({username: values.username, password: values.password});
    // return closeModal(false);
    /////////////////////////
}

const Login = ({loginUser, closeModal})=>{
    const classes = useStyles();
    
    return(
        <Paper elevation={10} className={classes.paperStyle}>
            <Grid align='center'>
                    <Avatar className={classes.icon}><LockOutlinedIcon/></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik 
            initialValues={initialValues}
            onSubmit={ (values, actions) => handleInput(values, actions, loginUser, closeModal) }
            validationSchema={validationSchema}
            >
                <Form >
                    <Field 
                        component={inputBar}
                        name="username"
                        type="text"
                    />
                    <Field 
                        component={inputBar}
                        name="password"
                        type="password"
                    />
                    <Button className={classes.btn} type="submit" fullWidth>Sign in</Button>
                </Form>
            </Formik>
            <Typography > Do you have an account ?
                <Link href="#" >
                    Sign Up 
                </Link>
            </Typography>
        </Paper>           
    );
}

export default Login