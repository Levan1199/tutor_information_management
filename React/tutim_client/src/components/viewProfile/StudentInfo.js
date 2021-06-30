import React, {useEffect, useState} from "react";
import { Avatar, Grid, Typography,  Container,FormControlLabel, Radio, RadioGroup, Divider, Button} from "@material-ui/core";
import {avatarUrl} from "../../shared/baseUrl";
import { makeStyles } from "@material-ui/core/styles";
import { Loading } from '../LoadingComponent';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';

import {connect} from 'react-redux';
import {teacherAwait, removeTeacherAwait, fetchStudentReg} from '../../redux/ActionCreators'

const mapStatetoProps = state =>{
  return{
    studentRegs: state.studentRegs,
    auth: state.auth,
    profiles: state.profiles,
    awaiting: state.awaiting,
  }   
}

const mapDispatchToProps = dispatch => ({
    removeTeacherAwait: (connecting)=>{dispatch(removeTeacherAwait(connecting))},
    teacherAwait: (connecting)=>{dispatch(teacherAwait(connecting))},
    fetchStudentReg: ()=>{dispatch(fetchStudentReg())},
})
 
const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor:"#f5f5f5",
        minHeight:"100vh"
    },
    container:{
        padding:"20px 0px"
    },
    root: {
      flexGrow: 1,
      padding: '20px 100px'
    },
    profileImg: {
        height:'300px',
        width:'300px'
    },
    paperStyle:{
        padding :20,
        height:'50vh',
        width:280, 
        margin:"20px auto",
    },
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    normalText:{
      fontFamily:"Segoe UI",
      fontWeight:"medium",
      fontSize:"1.5rem"
    },
    headerText:{
    fontWeight: "bold",
    fontFamily:"Roboto"
  },
}));

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


const RenderUI = (props) => {
    const classes = useStyles();
    const {stuProfile} = props;

    const handleRemove = () => {
        const obj = {studentId: stuProfile._id}
        return props.remove(obj);
    }

    let teacherId="";
    if(props.profile.teacherProfile){
        teacherId = props.profile.teacherProfile._id;
    }

    const grade = stuProfile.grade?stuProfile.grade.join(', '):"";
    const subject = stuProfile.subject?stuProfile.subject.join(', '):"";
    const district = stuProfile.district?stuProfile.district.join(', '):""; 
    var fee = (stuProfile.fee)?(stuProfile.fee.toLocaleString()):0;
    return (
        <Container maxWidth={false} className={classes.main}>
            <Container maxWidth="lg" className={classes.container}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                <Avatar className={classes.profileImg} src=
                    {avatarUrl+stuProfile.imgPath}
                    alt="Student Avatar"/>                      
                </Grid>

                <Grid item md={10} lg={8}>
                    <Typography variant="h2" className={classes.headerText}>
                            {stuProfile.name}
                    </Typography>
                    <Typography variant="h6" className={classes.normalText}>
                            Email: {stuProfile.email}
                    </Typography>   

                    <Divider/>

                    <Typography variant="h5" className={classes.normalText}>
                            Description: {stuProfile.description}
                    </Typography>     
                  
                </Grid>
                <Grid item md={2} lg={1}>                   
                    {(                                                
                        props.isStudentId
                    )?
                    <Button color="secondary" variant="contained" onClick={handleRemove}>Connecting</Button>
                    :<Button color="secondary" variant="contained" onClick={()=>handleRegister(props.register,stuProfile._id,props.auth, teacherId)}>Connect</Button>}
                </Grid>

                <Grid item md={12}>
                    <Divider/>
                </Grid>
            </Grid>
            
            <Grid container direction="row" spacing={2} >
                <Grid item md={6}>
                    <Typography variant="h4" className={classes.headerText} color="secondary">Class required information</Typography>
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Grade: </b>{grade}
                    </Typography>        
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Subject: </b>{subject}
                    </Typography>  
                    <Typography variant="body1" className={classes.normalText}>
                        <b>District: </b>{district}
                    </Typography>  
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Tuition Fee: </b>{fee}
                    </Typography>  
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Address: </b>{stuProfile.address} <Link to={`/map/${stuProfile.address}`}>Find!</Link>
                    </Typography>                   
                </Grid>
                <Grid item md={4}>
                    <Typography variant="h4" className={classes.headerText} color="secondary">
                        Finding teacher: 
                    </Typography> 
                        <RadioGroup row aria-label="position" name="available" defaultValue="top"
                            defaultChecked={stuProfile.available}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio name="available" checked={stuProfile.available===true}/>}
                                label="Yes"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio name="available" checked={stuProfile.available===false} />}
                                label="No"
                                labelPlacement="top"
                            />
                        </RadioGroup>
                </Grid>
         
            </Grid>        
           
    
        </Container>
        </Container>
    );
}

const ViewStudentInfo = (props) => {    
    const {studentRegs, profileId, fetchStudentReg, profiles, awaiting} = props;
    useEffect(()=>{
        fetchStudentReg();
      },[]);

    const stuProfile = studentRegs.studentRegs.filter((student)=>student._id===profileId)[0];
    
    if (!stuProfile) {
        return(
            <Loading />
        );
    }
    else {         
        const tempArr = awaiting.awaiting.filter((student)=>student.studentId._id === stuProfile._id);
        const awaitObj = tempArr.filter((teacher)=>teacher.teacherId === profiles.profiles.teacherProfile._id)[0];
        const isStudentId=(awaitObj)?true:false;
        return (
            <RenderUI stuProfile={stuProfile} remove={props.removeTeacherAwait}  isStudentId={isStudentId}  register={props.teacherAwait} auth={props.auth.isAuthenticated} profile={props.profiles.profiles} />
        );
    }
   
}

export default connect(mapStatetoProps, mapDispatchToProps)(ViewStudentInfo);