import React, {useEffect} from "react";
import {avatarUrl} from "../../shared/baseUrl";
import { Avatar, Grid, Typography, Divider, FormControlLabel, Checkbox, Radio, RadioGroup, Container, Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Loading } from '../LoadingComponent';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
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
    }
}));

const checkBoxValues = [
    {label:'Mon', value:2},
    {label:'Tue', value:3},
    {label:'Wed', value:4},
    {label:'Thu', value:5},
    {label:'Fri', value:6},
    {label:'Sat', value:7},
    {label:'Sun', value:8},
]

const RenderCheckBox = (props) => {
    const {value, label, weekly} = props;
    return (
        <FormControlLabel
        control={<Checkbox value={value}
        checked={weekly.includes(value)}
        />}
        label={label}
        labelPlacement="top"
        />
    );
}


const handleRegister = (register, teacherId, auth, studentId) =>{
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

const RenderUI = (props) => {
    const classes = useStyles();

    const {teacherProfile} = props.teaProfile;

    const handleRemove = () => {
        const obj = {teacherId: teacherProfile._id}
        return props.remove(obj);
    }

    let studentId="";
    if(props.profile.studentProfile){
        studentId = props.profile.studentProfile._id;
    }

    const grade = teacherProfile.grade?teacherProfile.grade.join(', '):"";
    const subject = teacherProfile.subject?teacherProfile.subject.join(', '):"";
    const district = teacherProfile.district?teacherProfile.district.join(', '):"";

    var fee = (teacherProfile.fee)?(teacherProfile.fee.toLocaleString()):0;

    return (
        <Container maxWidth={false} className={classes.main}>
            <Container maxWidth="lg" className={classes.container}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                    <Avatar className={classes.profileImg} src=
                    {avatarUrl+teacherProfile.imgPath}
                    alt="Teacher Avatar"/>                   
                </Grid>

                <Grid item md={10} lg={8}>
                    <Typography variant="h2" className={classes.headerText}>
                            {teacherProfile.name}
                    </Typography>
                    <Typography variant="h6" className={classes.normalText}>
                            Email: {teacherProfile.email}                   
                    </Typography>   

                    <Divider/>
                    
                    <Typography variant="h5" className={classes.normalText}>
                            Description: {teacherProfile.description}
                    </Typography>     
                  
                </Grid>
                <Grid item md={2} lg={1}>                   
                    {(                                                
                        props.isTeacherId
                    )?
                    <Button  color="secondary" variant="contained" onClick={handleRemove}>Connecting</Button>
                    :<Button color="secondary" variant="contained" onClick={()=>handleRegister(props.register,teacherProfile._id,props.auth, studentId)}>Connect</Button>}
                </Grid>
           
                <Grid item md={12}>
                    <Divider/>
                </Grid>
            </Grid>
            
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={6}>
                    <Typography variant="h4" className={classes.headerText} color="secondary">Class information</Typography>
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Grade: </b>{grade}
                    </Typography>        
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Subject: </b>{subject}
                    </Typography>  
                    <Typography variant="body1" className={classes.normalText}>
                        <b>District: </b>  {district}
                    </Typography>  
                    <Typography variant="body1" className={classes.normalText}>
                        <b>Tuition Fee: </b> {fee}
                    </Typography>  
                </Grid>

                <Grid item md={12} lg={5}>
                    <Typography variant="h4" className={classes.headerText} color="secondary">
                        Schedule 
                    </Typography>           
                    {checkBoxValues.map((obj, index) => (
                        <RenderCheckBox label={obj.label}
                        value={obj.value}
                        weekly = {teacherProfile.weekly}
                        key={index}/>
                    ))}   
                    <Grid item xs={12}>
                        <Typography variant="h4" className={classes.headerText} color="secondary">Available: </Typography>
                        <RadioGroup row aria-label="position" name="available" defaultValue="top"
                            defaultChecked={teacherProfile.available}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio name="available" checked={teacherProfile.available===true}/>}
                                label="Yes"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio name="available" checked={teacherProfile.available===false} />}
                                label="No"
                                labelPlacement="top"
                            />
                        </RadioGroup>
                    </Grid> 
                </Grid>
           
            </Grid>         
       
            </Container>
        </Container>
    );
}

const ViewTeacherInfo = (props) => {

    // useEffect(()=>{
    //     if(props.teaProfile){
    //         return (
    //             <RenderUI teaProfile={props.teaProfile} teacherId={props.teacherId} remove={props.remove}/>
    //         );
    //     }
    // },[props.profile]);

    if (props.isLoading) {
        return(
            <Loading />
        );
    }  
    else if (props.teaProfile) {  
        return (
            <RenderUI teaProfile={props.teaProfile}  isTeacherId={props.isTeacherId} remove={props.remove}   register={props.register} auth={props.auth} profile={props.profile}/>
        );   
    }
}

export default ViewTeacherInfo;