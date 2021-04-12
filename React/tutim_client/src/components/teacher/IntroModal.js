
import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
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

const initialValues = {
    name: '',
    email: '',
    description: ''
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),

    password: Yup.string()
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),
});





const handleInput = (values, actions, updateTeacherReg, closeModal)=>{   
    console.log('inside update reg: ',values);
    updateTeacherReg(values);
    return closeModal();
}

const IntroModal = (props)=>{
    const classes = useStyles();

    const inputBar = ({field, form, type, label, ...props}) => {
        const {name} = field;
        const helpText = "Nhập " + label;
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            />
            <ErrorMessage name={name}/>
            </>
        );
    }

    return(
        <Paper elevation={10} className={classes.paperStyle}>
            <Formik 
            initialValues={initialValues}
            onSubmit={ (values, actions) => handleInput(values, actions, props.updateTeacherReg, props.closeModal) }
            >               
                <Form >
                    <Typography variant="h5">Chỉnh sửa phần giới thiệu</Typography>
                    <Field 
                        component={inputBar}
                        name="name"
                        type="text"
                        label="Họ và tên"
                    />
                    <Field 
                        component={inputBar}
                        name="email"
                        type="text"
                        label="Email"
                    />
                    <Field 
                        component={inputBar}
                        name="description"
                        type="text"
                        label="Mô tả"
                    />
                    <Grid container direction="row"  justify="space-evenly">
                        <Grid md={4} item>
                            <Button className={classes.btn} type="submit" fullWidth>Lưu lại</Button>
                        </Grid>
                        <Grid md={4} item>
                            <Button className={classes.btn} type="submit" fullWidth>Hủy bỏ</Button>
                        </Grid>
                    </Grid>                
                </Form>
            </Formik>
        </Paper>           
    );
}

export default IntroModal