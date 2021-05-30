import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Loading} from '../LoadingComponent';
import {avatarUrl} from '../../shared/baseUrl';
import {Card, CardHeader, Avatar, CardContent, Button, Container, Grid, Typography, Divider, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import {Label, Col, Row} from 'reactstrap';
import {Multiselect} from 'multiselect-react-dropdown';
import * as FilterField from './constValues';
import "./findBar.css";
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
        }
    }));

    

    const multiSelectDropdown = ({field, form, option, placeholder, preVal})=>{
        const optionName = field.name;
        if(preVal!=undefined){
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

    const handleRegister = (register, teacherId, auth, isStudent) =>{
        if (!auth){
            alert("You need to login to register");
        }
        else if(!isStudent){
            alert("Only student can register");
        }
        else {
            register(teacherId);
            alert('register successfully');
        }
    }


    const RenderTeacherCard = ({teacher, register, auth, profile}) => {
            let subject = teacher.subject.join(', ');
            let grade = teacher.grade.join(', ');
            let district = teacher.district.join(', ');
        return(
       
        <Card className="border">
            <CardHeader avatar={<Avatar alt="avatar" src={avatarUrl+teacher.imgPath} />}
                        title={<Link to={`/newInfo/${teacher._id}`}>{teacher.name}</Link>}
                        subheader={'Email: '+ teacher.email}
                        titleTypographyProps={{variant:'h6' }}
                        action= {(                           
                            teacher.studentReg.includes((profile.studentProfile)?profile.studentProfile._id:null))
                            ?
                            <Button color="secondary" variant="contained">Đã Đăng ký</Button>
                            :<Button color="secondary" variant="contained" onClick={()=>
                                        handleRegister(register,teacher._id,auth, profile.isStudent)
                                     }>Đăng ký</Button>
                        }
            />
            <CardContent>
                <strong>Các lớp: </strong>{grade}
                <br/>
                <strong>Môn học: </strong>{subject}
                <br/>
                <strong>Khu vực quận: </strong>{district}
                <br/>
                <strong>Học phí: </strong>{teacher.fee}
                <br/>
                <strong>Thông tin khác: </strong>{teacher.description}
            </CardContent> 
        </Card>
        );
    }

    const TeacherRegs = (props) =>{
        const classes = useStyles();
        const [filterVals, setFilterVals] = React.useState({ district:[],
            grade:[],
            subject:[]})

        useEffect(()=>{
            if(props.subjectName!=null){
                setFilterVals(prev=>{
                    return {...prev,subject:[props.subjectName]};
                });
            }
        },[]);

        let foundTeachers = props.teacherRegs.filter((teacher)=>{
            return filterProps(filterVals, teacher);
        });

        console.log('found', foundTeachers);

        const handleSubmit = (values) => {
            var filterName = {};
                filterName.district = values.district.map(district=>district.name);
                filterName.grade = values.grade.map(grade=>grade.name);
                filterName.subject = values.subject.map(subject=>subject.name);
            setFilterVals(filterName);
        }
            return (
                <Container maxWidth="false" className={classes.main}>
                <Box className={classes.box}>
                    <Typography variant="h4" align="center" className={classes.normalText}>
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
                                {/* <Grid item xs={12} sm={3}>
                                    <Typography variant="h6" className={classes.text} >Current Teacher</Typography>
                                </Grid> */}
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
                            <Divider gutterBottom/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2} justify="center">
                            {/* <RenderFilter teachers={props.teacherRegs} register={props.register} auth={props.auth} profile={props.profile}/> */}
                            {(()=>{
                                if(foundTeachers!=null){
                                    return foundTeachers.map((teacher)=>{
                                        if(teacher.available){
                                        return (
                                                <Grid item xs={12} md={5}>
                                                <RenderTeacherCard teacher={teacher} register={props.register} auth={props.auth} profile={props.profile}/>
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
export default TeacherRegs;
