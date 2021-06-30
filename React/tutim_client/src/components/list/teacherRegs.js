import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import {Loading} from '../LoadingComponent';
import {avatarUrl} from '../../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button, Container, Grid, Typography, Divider, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form,  FastField } from "formik";
import {Multiselect} from 'multiselect-react-dropdown';
import * as FilterField from '../../shared/constValues';
import "./findBar.css";
import { toast } from 'react-toastify';
import {connect} from 'react-redux';
import {fetchTeacherReg, studentAwait} from '../../redux/ActionCreators'

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    auth: state.auth,
    profiles: state.profiles,
    awaiting: state.awaiting,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  studentAwait: (connecting)=>{dispatch(studentAwait(connecting))},

})
 

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
        },
        main:{
            backgroundColor:"#f5f5f5",
            padding:0,
            minHeight:"100vh"
        },
        box:{
            width:"100%",
            padding:"20px 0",
            backgroundColor:theme.palette.secondary.light
        },
        normalText:{
          fontFamily:"Segoe UI",
          fontWeight:"medium",
          fontSize:"1.5rem"
        },
        headerText:{
            fontWeight: "bold",
            fontFamily:"Roboto",
            color: theme.palette.primary.dark
        },
        card:{
            maxHeight:"250px",
            minHeight:"250px"
        }
    }));

    

    const multiSelectDropdown = ({field, form, option, placeholder, preVal})=>{
        const optionName = field.name;
        if(preVal !== undefined){
            const temp=[{name:preVal}];
            return (
                <Multiselect
                    options={option}
                    showArrow
                    placeholder={placeholder}
                    displayValue="name" 
                    showCheckbox
                    onSelect={(value)=>{
                        form.setFieldValue(optionName,value);
                    }}
                    selectedValues={temp}
                />
            );        
        }
        else{
            return (
                <Multiselect
                    options={option}
                    showArrow
                    placeholder	={placeholder}
                    displayValue="name" 
                    showCheckbox
                    onSelect={(value)=>{
                        form.setFieldValue(optionName,value);
                    }}
                />
            );       
        }
    }

   

    const filterProps = (filterVals,teacher) => {
        const dist = filterVals.district.every((e=>{
            return teacher.district.includes(e);
        }));
    
        const grade = filterVals.grade.every((e=>{
            return teacher.grade.includes(e);
        }));
    
        const subject = filterVals.subject.every((e=>{
            return teacher.subject.includes(e);
        }));
    
        const result = dist && grade && subject;
        return result;
    
    }

    const handleRegister = (register, teacherId, auth,  studentId) =>{
        const connecting = {studentId: studentId, teacherId: teacherId};      

        if (!auth){
            toast.error("You need to login!");      
        }
        else if(!studentId){
            toast.error("Only student can register"); 
        }
        else {
            register(connecting);
            toast.success('Register successfully');
        }
    }

    const switchWeekdays = (day) => {
        switch(day){
            case 2:
                return "Monday";
            case 3:
                return "Tuesday";
            case 4:
                return "Wednesday";
            case 5:
                return "Thursday";
            case 6:
                return "Friday";
            case 7:
                return "Saturday";
            case 8:
                return "Sunday";
            default:
                return "";                                                  
        }
    }

    const isInclude = (arr, teaId) =>{        
        const temp = arr.map(teacher=>teacher.teacherId._id);
        const index = temp.indexOf(teaId);
        if(index === -1)
            return false;
        else return true;
    }


    const RenderTeacherCard = ({teacher, register, auth, profile, awaiting}) => {
        const classes = useStyles();
        let subject = teacher.subject.join(', ');
        let grade = teacher.grade.join(', ');
        let district = teacher.district.join(', ');
        let weekly = teacher.weekly.map(switchWeekdays).join(', ');
        let fee = (teacher.fee)?teacher.fee.toLocaleString():""
        
        let studentId="";
        if(profile.studentProfile){
            studentId = profile.studentProfile._id;
        }

        return(       
        <Card className={classes.card}>
            <CardHeader avatar={<Avatar alt="avatar" src={avatarUrl+teacher.imgPath} />}
                        title={<Link to={`/profile/teacher/${teacher._id}`}>{teacher.name}</Link>}
                        subheader={'Email: '+ teacher.email}
                        titleTypographyProps={{variant:'h6' }}
                        action= {
                            (                        
                                isInclude(awaiting, teacher._id)
                            )
                            ?
                            <Button color="secondary" variant="contained">Connecting</Button>
                            :
                            <Button color="secondary" variant="contained" onClick={()=>
                                        handleRegister(register,teacher._id,auth, studentId)
                            }>Register</Button>
                        }
            />
            <CardContent>
                <strong>Grade: </strong>{grade}
                <br/>
                <strong>Subject: </strong>{subject}
                <br/>
                <strong>District: </strong>{district}
                <br/>
                <strong>Tuition fee: </strong>{fee}
                <br/>
                <strong>Available Weekdays: </strong>{weekly}
            </CardContent> 
        </Card>
        );
    }

    const TeacherRegs = (props) =>{
        const classes = useStyles();
        const [filterVals, setFilterVals] = useState({ district:[],
            grade:[],
            subject:[]});

        const {fetchTeacherReg} = props;
        useEffect(()=>{
            fetchTeacherReg();
        },[]);

        const {subjectName} = props;
        useEffect(()=>{
            if(subjectName != undefined){
                setFilterVals(prev=>{
                    return {...prev,subject:[subjectName]};
                });
            }
        },[]);
 
        let foundTeachers = props.teacherRegs.teacherRegs.filter((teacher)=>{           
            return filterProps(filterVals, teacher);
        });

        const handleSubmit = (values) => {
            var filterName = {};
                filterName.district = values.district.map(district=>district.name);
                filterName.grade = values.grade.map(grade=>grade.name);
                filterName.subject = values.subject.map(subject=>subject.name);
            setFilterVals(filterName);
        }
            return (
                <Container maxWidth={false} className={classes.main}>
                <Box className={classes.box}>
                    <Typography variant="h4" align="center" className={classes.headerText}>
                        Current teachers
                    </Typography>
                    <Typography variant="body1" align="center" className={classes.normalText}>
                        Current teachers that are available for various type of subjects
                    </Typography>
                </Box>
                <Container maxWidth="lg" className={classes.container} id="a22">
                    <Grid container spacing={1}>
                       <Grid item xs={12} className={classes.header}>
                            <Grid container spacing={1} className={classes.header}>
                                <Grid item xs={12} sm={9}>
                                    <Formik initialValues={FilterField.teachInit}
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
                                                        preVal={props.subjectName}
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
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2} justify="center">
                            {(()=>{
                                if(foundTeachers!=null){
                                    return foundTeachers.map((teacher, index)=>{
                                        if(teacher.available){
                                        return (
                                                <Grid item xs={12} md={5} key={index}>
                                                <RenderTeacherCard teacher={teacher} register={props.studentAwait} auth={props.auth} profile={props.profiles.profiles} awaiting={props.awaiting.awaiting}/>
                                                </Grid>
                                            );
                                        }
                                    });
                                }
                            })()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                </Container>
            );
    }
export default connect(mapStatetoProps, mapDispatchToProps)(TeacherRegs);
