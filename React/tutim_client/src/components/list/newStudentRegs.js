
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
// import {baseUrl} from '../shared/baseUrl';
import {BreadcrumbItem, Breadcrumb, Label, Col, Row} from 'reactstrap';
import {Card, CardHeader, Avatar, CardContent, Button, Container, Grid, Typography, Divider} from '@material-ui/core';
import {Multiselect} from 'multiselect-react-dropdown';
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as FilterField from './constValues';
import { makeStyles } from '@material-ui/core/styles';
import "./teacher.css";
const useStyles = makeStyles((theme)=>({
    text:{
        fontWeight: "bold",
        fontSize: "30px",
        color: theme.palette.primary.dark
    },
    container:{
        padding:"20px 0px"
    },
    header:{
        paddingBottom: "10px"
    },
    button:{
        height:"50px",
        width:"75px"
    }
    
}));

const multiSelectDropdown = ({field, form, meta, option, ...props})=>{
    const optionName = field.name;
    return (
        <Multiselect
            options={option}
            displayValue="name" 
            showCheckbox
            onSelect={(value)=>{
                form.setFieldValue(optionName,value);
            }}
        />
    );
}

const filterProps = (filterVals,student) => {
    const dist = filterVals.district.every((e=>{
        return student.district.includes(e);
    }));

    const grade = filterVals.grade.every((e=>{
        return student.grade.includes(e);
    }));

    const subject = filterVals.subject.every((e=>{
        return student.subject.includes(e);
    }));

    const result = dist && grade && subject;
    return result;

}


const handleRegister = (register, studentId, auth, isTeacher) =>{
    if (!auth){
        alert("You need to login to register");
    }
    else if(!isTeacher){
        alert("Only teacher can register");
    }
    else {
        register(studentId);
        alert('register successfully');
    }
}

function RenderStudentCard({student, auth, profile,register}){
    let subject = student.subject.join(', ');
    let grade = student.grade.join(', ');
    let dist = student.district.join(',');
    return(
        <Card className="border">
            <CardHeader 
                title={"Lớp: " + grade}
                subheader={"Môn học: " + subject}
                titleTypographyProps={{variant:'h5' }}
                action={
                    (
                    student.teacherReg.includes((profile.teacherProfile)?profile.teacherProfile._id:null))?
                    <Button color="secondary" variant="contained">Đã Đăng ký</Button>
                    :<Button color="secondary" variant="contained" onClick={()=>
                        handleRegister(register,student._id,auth, profile.isTeacher)
                    }>Đăng ký</Button>
                }
            />
            <CardContent>
                <strong>Số buổi trong tuần: </strong>{student.periodAWeek}
                <br/>
                <strong>Thời gian: </strong>{student.time}
                <br/>
                <strong>Địa chỉ: </strong>{student.address}
                <br/>
                <strong>Học phí: </strong>{student.fee}
                <br/>
                <strong>Quận: </strong>{dist}
                <br/>
                <strong>Yêu cầu khác: </strong>{student.description}
                
            </CardContent> 
        </Card>
    );
}




const NewStudentRegs = (props) =>{      
    const classes = useStyles();
        const [filterVals, setFilterVals] = React.useState({ district:[],
            grade:[],
            subject:[]})

        let foundStudents = props.studentRegs.filter((student)=>{
            return filterProps(filterVals, student);
        });

        const handleSubmit = (values) => {
            var filterName = {};
                filterName.district = values.district.map(district=>district.name);
                filterName.grade = values.grade.map(grade=>grade.name);
                filterName.subject = values.subject.map(subject=>subject.name);
            setFilterVals(filterName);
        }
            return (
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={1}>
                       <Grid item xs={12} className={classes.header}>
                            <Grid container spacing={1} className={classes.header}>
                                <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" className={classes.text} >Current Class</Typography>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <Formik initialValues={FilterField.stuInit}
                                    onSubmit = {handleSubmit}
                                    >
                                        <Form>
                                            <Grid container spacing={1} className={classes.multiSelect}>
                                                <Grid item xs={12} sm={3}>
                                                    <FastField
                                                        id="district"
                                                        name="district"
                                                        component={multiSelectDropdown}
                                                        option={FilterField.distOption}
                                                        placeholder="District"
                                                    />  
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <FastField
                                                        id="grade"
                                                        name="grade"
                                                        component={multiSelectDropdown}
                                                        option={FilterField.gradOption}
                                                        placeholder="Grade"
                                                    />  
                                                </Grid>
                                                <Grid item xs={12} sm={3}>
                                                    <FastField
                                                        id="subject"
                                                        name="subject"
                                                        component={multiSelectDropdown}
                                                        option={FilterField.subjOption}
                                                        placeholder="Subject"
                                                    />  
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Button 
                                                    className={classes.button}
                                                    color="secondary" type="submit" variant="contained"
                                                    >Find</Button>  
                                                </Grid>                                            
                                            </Grid>
                                        </Form>
                                    </Formik>
                                </Grid>
                            </Grid>
                            <Divider gutterBottom/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2} justify="center">
                            {(()=>{
                                if(foundStudents!=null){
                                    return foundStudents.map((student)=>{
                                       
                                        return (
                                                <Grid item xs={12} md={5}>
                                                <RenderStudentCard student={student} register={props.register} auth={props.auth} profile={props.profile}/>
                                                </Grid>
                                            );
                                       
                                    });
                                }
                            })()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            );
}

export default NewStudentRegs;