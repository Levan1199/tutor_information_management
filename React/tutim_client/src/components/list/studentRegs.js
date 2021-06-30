
import React, { useEffect } from 'react';
// import {Loading} from '../LoadingComponent';
import {Card, CardHeader, CardContent, Button, Container, Grid, Typography, Divider, Box} from '@material-ui/core';
import {Multiselect} from 'multiselect-react-dropdown';
import { Formik, Form,  FastField } from "formik";
import * as FilterField from '../../shared/constValues';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import "./findBar.css";
import { toast } from 'react-toastify';

import {connect} from 'react-redux';
import {fetchStudentReg, teacherAwait} from '../../redux/ActionCreators'

const mapStatetoProps = state =>{
  return{
    studentRegs: state.studentRegs,
    auth: state.auth,
    profiles: state.profiles,
    awaiting: state.awaiting,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchStudentReg:()=>{dispatch(fetchStudentReg())},
  teacherAwait: (connecting)=>{dispatch(teacherAwait(connecting))},

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
    } ,
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
      fontSize:"1.5rem",
    },
    headerText:{
        fontWeight: "bold",
        fontFamily:"Roboto",
        color: theme.palette.primary.dark
    },
    card:{
        minHeight:"220px",
        maxHeight:"220px"
    },
    
    cardcontent: {
        "&:last-child": {
        paddingTop: 0
        }
    }    
}));

const multiSelectDropdown = ({field,placeholder, form, meta, option, ...props})=>{
    const optionName = field.name;
    return (
        <Multiselect
            options={option}
            displayValue="name" 
            placeholder={placeholder}
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


const handleRegister = (register, studentId, auth, teacherId) =>{
    const connecting = {studentId: studentId, teacherId: teacherId};
    if (!auth){
        toast.error("You need to login!");      
    }
    else if(!teacherId){
        toast.error("Only teacher can register"); 
    }
    else {
        register(connecting);
        toast.success('Register successfully');
    }
}

const isInclude = (arr, teaId) =>{        
    const temp = arr.map(student=>student.studentId._id);
    const index = temp.indexOf(teaId);
    if(index === -1)
        return false;
    else return true;
}

function RenderStudentCard({student, auth, profile,register, awaiting}){
    const editStyle = useStyles();
    let subject = student.subject.join(', ');
    let dist = student.district.join(',');
    let fee = (student.fee)?student.fee.toLocaleString():""

    let teacherId="";
    if(profile.teacherProfile){
        teacherId = profile.teacherProfile._id;
    }

    return(
        <Card className={editStyle.card}>            
            <CardHeader 
                title={"Subject: " + subject}
                subheader={<Link to={`/profile/student/${student._id}`}>Student: {student.name}</Link>}
                classes={{
                    title: editStyle.headerText,
                    subheader: editStyle.normalText
                }}
                action={
                    (                                                
                        isInclude(awaiting, student._id)
                    )?
                    <Button color="secondary" variant="contained">Connecting</Button>
                    :<Button color="secondary" variant="contained" onClick={()=>
                        handleRegister(register,student._id,auth, teacherId)
                    }>Register</Button>
                }
            />
            <CardContent className={editStyle.cardcontent}>              
                <strong>Address: </strong>{student.address}  <Link to={`/map/${student.address}`}>Find!</Link>
                <br/>
                <strong>Recommend Tuition Fee: </strong>{fee}
                <br/>
                <strong>District: </strong>{dist}
                <br/>
                <strong>Description: </strong>{student.description}
                
            </CardContent> 
        </Card>
    );
}




const StudentRegs = (props) =>{      
    const {fetchStudentReg} = props;
    useEffect(()=>{
        fetchStudentReg();
    },[]);

    const classes = useStyles();
        const [filterVals, setFilterVals] = React.useState({ district:[],
            grade:[],
            subject:[]})

        let foundStudents = props.studentRegs.studentRegs.filter((student)=>{
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
                <Container maxWidth={false} className={classes.main}>
                <Box className={classes.box}>
                    <Typography variant="h4" align="center" className={classes.headerText}>
                        Current classes
                    </Typography>
                    <Typography variant="body1" align="center" className={classes.normalText}>
                        Current classes that is in need of teachers requested by students 
                    </Typography>
                </Box>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={1}>
                       <Grid item xs={12} className={classes.header}>
                            <Grid container spacing={1} className={classes.header}>
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
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container direction="row" spacing={2} justify="center">
                            {(()=>{
                                if(foundStudents!==null){
                                    return foundStudents.map((student, index)=>{
                                       if(student.available){
                                        return (
                                                <Grid item xs={12} md={5} key={index}>
                                                <RenderStudentCard student={student} register={props.teacherAwait} auth={props.auth} profile={props.profiles.profiles} awaiting={props.awaiting.awaiting}/>
                                                </Grid>
                                            );
                                        }
                                       else{
                                           return "";
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

export default connect(mapStatetoProps, mapDispatchToProps)(StudentRegs);