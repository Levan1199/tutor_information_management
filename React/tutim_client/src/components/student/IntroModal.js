
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
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),

    password: Yup.string()
        .required('Bạn cần điền mục này')
        .min(4,'Cần nhiều hơn 4 chữ cái')
        .max(36,'Ít hơn 36 chữ cái'),
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


    const inputBar = ({field, form, type, label, ...props}) => {
        const {name} = field;
        const helpText = "Nhập " + label;
        const initialValue = form.values[name];
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
             defaultValue={initialValue}
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            />
            <ErrorMessage name={name}/>
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
                buttonText="Thay đổi ảnh đại diện"
                onChange={(pic)=>form.setFieldValue(name, pic[0])}
                imgExtension={[".jpg", ".gif", ".png"]}
                maxFileSize={1048576}
                fileSizeError=" file size is too big"
          />
       
        );
    }

    return(
        <Paper elevation={10} className={classes.paperStyle}>
            <Formik 
            initialValues={initialValues}
            onSubmit={ (values, actions) => handleInput(values, actions, props.updateProfile, props.closeModal) }
            >               
                <Form >
                <Typography variant="h5">Chỉnh sửa phần giới thiệu</Typography>
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
                                        label="Họ và tên"
                                    />
                                </Grid>
                            
                                <Grid item>
                                    <Field 
                                        component={inputBar}
                                        name="email"
                                        type="text"
                                        label="Email"
                                    />
                                </Grid>
                            
                                <Grid item>
                                    <Field 
                                        component={inputBar}
                                        name="description"
                                        type="text"
                                        label="Mô tả"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
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