
import React from 'react';
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import {Multiselect} from 'multiselect-react-dropdown';
// import * as Yup from "yup"; 
import * as FilterField from '../../shared/constValues';

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
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },
    outerColumn:{
        borderRight: "1px solid grey",
        padding:'5px'
    },
    checkbox:{
        color: theme.palette.secondary.main,
        
    }

}));


// const validationSchema = Yup.object({
//     fee: Yup.number()
//         .typeError('you must specify a number')
//         .positive('The number must be positive')
// });

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
    updateProfile(values);
    return closeModal();
}


const DetailModal = (props)=>{
    const classes = useStyles();
    const {grade, subject, district, fee, weekly, available} = props;

   

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
        weekly:weekly,
        available: available,
    }


    const checkBox = ({field, form, label, value}) => {
        const {name} = field;
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

    const inputBar = ({field, form, type, label, errors, touched}) => {
        const {name} = field;
        const helpText = "Input " + label;
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} placeholder={helpText} className={classes.inputBar} fullWidth margin="normal"
            defaultValue={fee}
            onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
            error={touched[name] && Boolean(errors[name])}
            helperText={errors[name]}
            />
            </>
        );
    }

    const multiSelectDropdown = ({field, form, meta,label, option}) => {
     
        const optionName = field.name;
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
                id={field.name}
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
                control={<Radio name="available" checked={form.values.available===true}/>}
                label="Yes"
                labelPlacement="top"
            />
            <FormControlLabel
                value='false'
                control={<Radio name="available" checked={form.values.available===false} />}
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
                  {({ errors, touched}) => (        
                    <Form>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={6} className={classes.outerColumn}>
                        <Typography variant="h5" color="primary">Edit requirement for the class</Typography>
                        <Field 
                            component={multiSelectDropdown}
                            name="grade"
                            type="text"
                            label="Grade"
                            option={FilterField.gradOption}
                        />
                        <Field 
                            component={multiSelectDropdown}
                            name="subject"
                            type="text"
                            label="Subject"
                            option={FilterField.subjOption}
                        />
                        <Field 
                            component={multiSelectDropdown}
                            name="district"
                            type="text"
                            label="District"
                            option={FilterField.distOption}
                        />
                        <Field 
                            component={inputBar}
                            name="fee"
                            type="text"
                            label="Tuition Fee"
                            errors={errors}
                            touched={touched}
                        />
                </Grid>

                <Grid item sm={12} md={6}>
                    <Typography variant="h5" color="primary"> Available Schedule</Typography>
                    <Grid>
                    
                    <Typography className={classes.label}>Workday</Typography>
                    {checkBoxValues.map( (obj,idx) => (
                        <Field
                        key={idx}
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
                            <Button className={classes.btn} type="submit" fullWidth>Save</Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button className={classes.btn} fullWidth onClick={props.closeModal}>Cancel</Button>
                        </Grid>
                    </Grid>             
                </Grid>
            </Grid>
            </Form>
            )}
                </Formik>
        </Paper>           
    );
}

export default DetailModal

