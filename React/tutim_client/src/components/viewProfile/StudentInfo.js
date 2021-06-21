import React, {useEffect} from "react";
import { Avatar, Grid, Typography,  Container,FormControlLabel, Radio, RadioGroup, Divider, Button} from "@material-ui/core";
import {avatarUrl} from "../../shared/baseUrl";
import { makeStyles } from "@material-ui/core/styles";
import { Loading } from '../LoadingComponent';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
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
    const {studentProfile} = props.stuProfile;

    const handleRemove = () => {
        const obj = {studentId: studentProfile._id}
        return props.remove(obj);
    }

    let teacherId="";
    if(props.profile.teacherProfile){
        teacherId = props.profile.teacherProfile._id;
    }

    const grade = studentProfile.grade?studentProfile.grade.join(', '):"";
    const subject = studentProfile.subject?studentProfile.subject.join(', '):"";
    const district = studentProfile.district?studentProfile.district.join(', '):""; 
    var fee = (studentProfile.fee)?(studentProfile.fee.toLocaleString()):0;
    return (
        <Container maxWidth={false} className={classes.main}>
            <Container maxWidth="lg" className={classes.container}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                <Avatar className={classes.profileImg} src=
                    {avatarUrl+studentProfile.imgPath}
                    alt="Student Avatar"/>                      
                </Grid>

                <Grid item md={10} lg={8}>
                    <Typography variant="h2" className={classes.headerText}>
                            {studentProfile.name}
                    </Typography>
                    <Typography variant="h6" className={classes.normalText}>
                            Email: {studentProfile.email}
                    </Typography>   

                    <Divider/>

                    <Typography variant="h5" className={classes.normalText}>
                            Description: {studentProfile.description}
                    </Typography>     
                  
                </Grid>
                <Grid item md={2} lg={1}>                   
                    {(                                                
                        props.isStudentId
                    )?
                    <Button color="secondary" variant="contained" onClick={handleRemove}>Connecting</Button>
                    :<Button color="secondary" variant="contained" onClick={()=>handleRegister(props.register,studentProfile._id,props.auth, teacherId)}>Connect</Button>}
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
                        <b>Address: </b>{studentProfile.address} <Link to={`/map/${studentProfile.address}`}>Find!</Link>
                    </Typography>                   
                </Grid>
                <Grid item md={4}>
                    <Typography variant="h4" className={classes.headerText} color="secondary">
                        Finding teacher: 
                    </Typography> 
                        <RadioGroup row aria-label="position" name="available" defaultValue="top"
                            defaultChecked={studentProfile.available}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio name="available" checked={studentProfile.available===true}/>}
                                label="Yes"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio name="available" checked={studentProfile.available===false} />}
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
    // useEffect(()=>{
    //     if(props.profile){
    //         return (
    //             <RenderUI profile={props.profile}/>
    //         );
    //     }
    // },[props.profile]);
    
    if (props.isLoading) {
        return(
            <Loading />
        );
    }
    else if (props.profile) {         
        return (
            <RenderUI stuProfile={props.stuProfile} remove={props.remove}  isStudentId={props.isStudentId}  register={props.register} auth={props.auth} profile={props.profile} />
        );
    }
}

export default ViewStudentInfo;