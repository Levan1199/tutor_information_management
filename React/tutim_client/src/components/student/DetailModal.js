
import React from 'react';
import { Grid,Paper, TextField, Button, Typography, InputLabel } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form,  Field } from "formik";
import {Multiselect} from 'multiselect-react-dropdown';
import * as Yup from "yup"; 
import * as FilterField from '../../shared/constValues';
import {connect} from 'react-redux';
import {updateProfile} from '../../redux/ActionCreators'


const mapDispatchToProps = dispatch => ({
  updateProfile: (props)=>{dispatch(updateProfile(props))},
})

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
    fee: Yup.number()
        .typeError('you must specify a number')
        .positive('The number must be positive')
});

const DetailModal = (props)=>{
    const classes = useStyles();
    const {grade, subject, district, fee, address, available, updateProfile, closeModal} = props;

    async function updateInfo(values){
        return await updateProfile(values);
    }
    const handleInput = (values)=>{   
        updateInfo(values);
        return closeModal();
    }
   

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
        address:address,
        available:available
    }


    const inputBar = ({field, form, type, label, errors, touched}) => {
        const {name} = field;
        const dfVals = (name==="fee")?fee:address;
        return (
            <>
            <InputLabel className={classes.label} htmlFor={name}>{label}</InputLabel>
            <TextField type={type} name={name} className={classes.inputBar} fullWidth margin="normal"
            defaultValue={dfVals}
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
                        return form.setFieldValue(optionName,arr);
                    });
                  
                }}
            />
        );
    }
    const renderRadio = ({form}) => {
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
                onSubmit={handleInput}
                validationSchema={validationSchema}
                >               
                 {({ errors, touched}) => (  
                    <Form>
                    <Grid container justify="center">
                        <Grid item sm={12} className={classes.outerColumn}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}> <Typography variant="h5" color="primary">Edit requirement for the class</Typography></Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        component={multiSelectDropdown}
                                        name="grade"
                                        type="text"
                                        label="Grade"
                                        option={FilterField.gradOption}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                        component={multiSelectDropdown}
                                        name="subject"
                                        type="text"
                                        label="Subject"
                                        option={FilterField.subjOption}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field 
                                    component={multiSelectDropdown}
                                    name="district"
                                    type="text"
                                    label="District"
                                    option={FilterField.distOption}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field 
                                    component={inputBar}
                                    name="fee"
                                    type="text"
                                    label="Tuition Fee"
                                    errors={errors}
                                    touched={touched}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <Field 
                                    component={inputBar}
                                    name="address"
                                    type="text"
                                    label="Address"
                                    errors={errors}
                                    touched={touched}
                                    />
                                </Grid>
                                    
                                <Grid item xs={6}>
                                    <FormLabel> <Typography variant="body1" color="primary">Looking for teacher now</Typography></FormLabel>
                                    <Field
                                        component={renderRadio}
                                        name="available"
                                    />
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item sm={12}>
                            <Grid container direction="row"  justify="flex-end" spacing={1}
        >
                                <Grid item md={2}>
                                    <Button className={classes.btn} type="submit" fullWidth>Save</Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Button className={classes.btn} fullWidth onClick={closeModal}>Cancel</Button>
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

export default connect(null,mapDispatchToProps)(DetailModal);

