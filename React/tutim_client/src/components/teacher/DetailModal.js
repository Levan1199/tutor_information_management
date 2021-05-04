
import React, { useState } from 'react'
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { CheckboxWithLabel } from 'formik-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, ErrorMessage, Field } from "formik";
import {Multiselect} from 'multiselect-react-dropdown';
import * as Yup from "yup"; 
import { boolean } from 'yup/lib/locale';

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
        borderRight: "1px solid grey",
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

const checkBoxValues = [
    {label:'Mon', value:2},
    {label:'Tue', value:3},
    {label:'Wed', value:4},
    {label:'Thu', value:5},
    {label:'Fri', value:6},
    {label:'Sat', value:7},
    {label:'Sun', value:8},
    
]




const handleInput = (values, actions, updateProfile, closeModal)=>{   
    console.log('inside update reg: ',values);
    updateProfile(values);
    return closeModal();
}


const DetailModal = (props)=>{
    const classes = useStyles();
    const {grade, subject, district, fee, weekly, available} = props;

   

    const preGrade = [];
    grade.map((e)=>{
        preGrade.push({name:e});
    });

    const preSubject = [];
    subject.map((e)=>{
        preSubject.push({name:e});
    });

    const preDistrict = [];
    district.map((e)=>{
        preDistrict.push({name:e});
    });
    // console.log('ggg ', weekly, typeof(preDistrict[0]), preSubject, preDistrict);
    const initialValues = {
        grade:grade,
        subject:subject,
        district:district,
        fee:fee,
        weekly:weekly,
        available: available,
    }


    const checkBox = ({field, form, label, value}) => {
        const {name} = field;
        console.log('ggg', form.values.weekly);
        return (
            <FormControlLabel
            control={<Checkbox value={value} name={name} 
            onChange={(evt)=>{
                const data = field.value;
                const numLoc = data.indexOf(parseInt(evt.target.value));
                if (numLoc === -1){
                    data.push(parseInt(evt.target.value));
                }
                else if (numLoc !== -1) {
                    data.splice(numLoc,1);
                }
                form.setFieldValue(name, data);
            }}
            checked={form.values.weekly.includes(value)}
            />}
            label={label}
            labelPlacement="top"
            className={classes.checkbox}
            />
        );
    }

    const inputBar = ({field, form, type, label, ...props}) => {
        const {name} = field;
        const helpText = "Nhập " + label;
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
            defaultValue={fee}
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

    const renderRadio = ({form}) => {
        // const {touched, errors} = form;
        return ( 
        <>
        <RadioGroup row aria-label="position" name="available" defaultValue="top"
        defaultChecked={available}
        onChange={(evt)=>form.setFieldValue("available", (evt.target.value === 'true'))}>
            <FormControlLabel
                value='true'
                control={<Radio name="available" checked={form.values.available==true}/>}
                label="Yes"
                labelPlacement="top"
            />
            <FormControlLabel
                value='false'
                control={<Radio name="available" checked={form.values.available==false} />}
                label="No"
                labelPlacement="top"
            />
        </RadioGroup>
        </>
        );
    }

    return(
        <Paper elevation={10} className={classes.paperStyle}>
                <Formik 
                initialValues={initialValues}
                onSubmit={ (values, actions) => handleInput(values, actions, props.updateProfile, props.closeModal) }
                >               
                    <Form>
                    <Grid container>
                        <Grid item sm={12} md={6} className={classes.outerColumn}>
                        <Typography variant="h5">Chỉnh sửa phần giới thiệu</Typography>
                        <Field 
                            component={multiSelectDropdown}
                            name="grade"
                            type="text"
                            label="Các lớp"
                        />
                        <Field 
                            component={multiSelectDropdown}
                            name="subject"
                            type="text"
                            label="Môn học"
                        />
                        <Field 
                        component={multiSelectDropdown}
                        name="district"
                        type="text"
                        label="District"
                        />
                        <Field 
                        component={inputBar}
                        name="fee"
                        type="text"
                        label="học phí"
                        />
                </Grid>

                <Grid item sm={12} md={6}>
                    <Typography variant="h5"> Available Schedule</Typography>
                    <Grid>
                    
                    <Typography className={classes.label}>Workday</Typography>
                    {checkBoxValues.map( obj => (
                        <Field
                        component={checkBox}
                        name="weekly"
                        label={obj.label}
                        value={obj.value}
                        />
                    ))}          
                    </Grid>
                    <Grid>
                        <FormLabel className={classes.label}>Available</FormLabel>
                        <Field
                            component={renderRadio}
                            name="available"
                        />
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

