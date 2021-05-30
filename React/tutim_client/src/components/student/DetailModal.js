
import React from 'react';
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {Multiselect} from 'multiselect-react-dropdown';
import * as Yup from "yup"; 

const useStyles = makeStyles(theme => ({
    paperStyle:{
        padding :'20px',
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
        color: theme.palette.primary.main
    },
    outerColumn:{
        padding:'5px'
    },
    checkbox:{
        color: theme.palette.secondary.main,
        
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

const options={
    district:[
        {name: 'Quận 1'},
        {name: 'Quận 2'},
        {name: 'Quận 3'},
        {name: 'Quận 4'},
        {name: 'Quận 5'},
        {name: 'Quận 6'},
        {name: 'Quận 7'},
        {name: 'Quận 8'},
        {name: 'Quận 9'},
        {name: 'Quận 10'},
        {name: 'Quận 11'},
        {name: 'Quận 12'},
        {name: 'Quận Thủ Đức'},
        {name: 'Quận Bình Thạnh'},
        {name: 'Quận Tân Bình'},
        {name: 'Quận Phú Nhuận'},
        {name: 'Quận Tân Phú'},
        {name: 'Quận Bình Tân'},
        {name: 'Quận Gò Vấp'}
    ],
    grade:[
        {name: 'Lớp 1'},
        {name: 'Lớp 2'},
        {name: 'Lớp 3'},
        {name: 'Lớp 4'},
        {name: 'Lớp 5'},
        
    ],
    subject:[
        {name: 'Toán'},
        {name: 'Lý'},
        {name: 'Hóa'},
    ]

}


const handleInput = (values, actions, updateProfile, closeModal)=>{   
    updateProfile(values);
    return closeModal();
}


const DetailModal = (props)=>{
    const classes = useStyles();
    const {grade, subject, district, fee, address} = props;

   

    const preGrade = [];
    grade.map((e)=>{
        return preGrade.push({name:e});
    });

    const preSubject = [];
    subject.map((e)=>{
        return preSubject.push({name:e});
    });

    const preDistrict = [];
    district.map((e)=>{
        return preDistrict.push({name:e});
    });

    const initialValues = {
        grade:grade,
        subject:subject,
        district:district,
        fee:fee,
        address:address
    }


    const inputBar = ({field, form, type, label, ...props}) => {
        const {name} = field;
        const dfVals = (name==="fee")?fee:address;
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} className={classes.inputBar} fullWidth margin="normal"
            defaultValue={dfVals}
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            />
            <ErrorMessage name={name}/>
            </>
        );
    }

    const multiSelectDropdown = ({field, form, meta,label, ...props}) => {
     
        const optionName = field.name;
        const option = options[optionName];
        var preValue;
        if (optionName === 'district'){
            preValue = preDistrict;
        }
        else if(optionName === 'grade'){
            preValue = preGrade;
        }
        else{
            preValue=preSubject;
        }
        return (
            <Multiselect
                options={option}
                displayValue="name" 
                showCheckbox
                selectedValues = {preValue}
                placeholder={label}
                onSelect={(value)=>{
                    const arr = [];
                    value.map(e=>{
                        arr.push(e.name);
                        form.setFieldValue(optionName,arr);
                    });
                  
                }}
            />
        );
    }

    return(
        <Paper elevation={10} className={classes.paperStyle}>
                <Formik 
                initialValues={initialValues}
                onSubmit={ (values, actions) => handleInput(values, actions, props.updateProfile, props.closeModal) }
                >               
                    <Form>
                    <Grid container justify="center">
                        <Grid item sm={12} className={classes.outerColumn}>
                            <Grid container justify="center" spacing={1}>
                                <Grid item xs={12}> <Typography variant="h5">Edit Detail Requirement for the class</Typography></Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        component={multiSelectDropdown}
                                        name="grade"
                                        type="text"
                                        label="Grade"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        component={multiSelectDropdown}
                                        name="subject"
                                        type="text"
                                        label="Subject"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                    component={multiSelectDropdown}
                                    name="district"
                                    type="text"
                                    label="District"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field 
                                    component={inputBar}
                                    name="fee"
                                    type="text"
                                    label="Tuition Fee"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <Field 
                                    component={inputBar}
                                    name="address"
                                    type="text"
                                    label="Address"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sm={12}>
                            <Grid container direction="row"  justify="flex-end" spacing={1}
        >
                                <Grid item md={2}>
                                    <Button className={classes.btn} type="submit" fullWidth>Lưu lại</Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Button className={classes.btn} fullWidth onClick={props.closeModal}>Hủy bỏ</Button>
                                </Grid>
                            </Grid>             
                        </Grid>
                    </Grid>
            </Form>
            </Formik>
        </Paper>           
    );
}

export default DetailModal

