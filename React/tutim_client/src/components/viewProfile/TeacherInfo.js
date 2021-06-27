import React, {useEffect} from "react";
import {avatarUrl, baseUrl} from "../../shared/baseUrl";
import { Avatar, Grid, Typography, Divider, FormControlLabel, Checkbox, Radio, RadioGroup, Container, Button, Paper, Modal} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Loading } from '../LoadingComponent';
import { toast } from 'react-toastify';
import CommentModal from './CommentModal'

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
    //   padding: '20px 100px'
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
    cmt:{
        fontFamily:"Segoe UI",
        fontWeight:"medium",
    },
    paper: {
        padding:'2px',
        maxWidth: '100%',
        backgroundColor: '#f5f5f5',      
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

const Comment = ({cmt}) =>{
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
          <Paper className={classes.paper} variant="outlined" > 
            <Grid container alignItems="center" >
              <Grid sm={1} justify="center" container>
                <Avatar alt="avatar" src={avatarUrl+cmt.commenter.imgPath}/>                     
              </Grid>
              <Grid item sm={10} container alignItems="center">                
                  <Grid item>
                    <Typography variant="subtitle1" className={classes.headerText}>
                      {cmt.commenter.name} 
                    </Typography> 
                    <Typography variant="body1" className={classes.cmt}>
                      rate:  {cmt.rating} 
                    </Typography>                  
                    <Typography variant="body2" className={classes.cmt}>
                      {cmt.comment}
                    </Typography>
                  </Grid>                
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
}

const RenderUI = (props) => {
    const classes = useStyles();
    const [commentModal, setCommentModal] = React.useState(false);

    const {teacherProfile} = props.teaProfile;

    const handleRemove = () => {
        const obj = {teacherId: teacherProfile._id}
        return props.remove(obj);
    }

    let studentId="";
    if(props.profile.studentProfile){
        studentId = props.profile.studentProfile._id;
    }

    const handleComment = () => {
        if(!props.auth || !studentId){
            toast.error("Only student account can leave comment"); 
        }
        else{
            return setCommentModal(true);
        }
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
                <Grid item md={12}>
                    <Divider/>
                </Grid>
            </Grid>                    

            <Modal
            className={classes.modal}
            open={commentModal}
            onClose={()=>setCommentModal(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <CommentModal closeModal={()=>setCommentModal(false)} postComment={props.postComment} id={teacherProfile._id}/>              
            </Modal>    

            </Container>

            <Container maxWidth="lg" className={classes.container}>
               
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={10}> 
                        <Typography variant="h4" className={classes.headerText} color="secondary">
                            Comments:                 
                        </Typography>                 
                    </Grid>                
                    <Grid item xs={2}>
                        <Button onClick={handleComment} color="secondary" variant="contained">Submit Comment</Button>    
                    </Grid>
                </Grid>

                <Grid container justify="center" spacing={2}>
                {(()=>{
                    if(props.cmt){
                        return props.cmt.map((comment,i)=>{
                        return (      
                            <Grid item xs={12} key={i}>                     
                                <Comment cmt={comment}/>
                            </Grid>
                            )
                        })
                    }                    
                })()}              
                </Grid>


            </Container>
        </Container>
    );
}

const ViewTeacherInfo = (props) => {
    const teachID = props.teaProfile.teacherProfile._id;
    const route = baseUrl + 'comments/' + teachID;
    console.log(route);
    let temp;
    fetch(route)
        .then(response => {
            console.log(response.json);
            return response.json})
        .then(res=>temp=res);
    console.log(temp);

    // useEffect(()=>{
    //     if(props.teaProfile){
    //         return (
    //             <RenderUI teaProfile={props.teaProfile} teacherId={props.teacherId} remove={props.remove}/>
    //         );
    //     }
    // },[props.profile]);

    // teaProfile={props.teaProfile}  isTeacherId={props.isTeacherId} remove={props.remove}  register={props.register} auth={props.auth} profile={props.profile} cmt={props.cmt}
    if (props.isLoading) {
        return(
            <Loading />
        );
    }  
    else if (props.teaProfile) {  
        
        return (
            <RenderUI {...props}/>
        );   
    }
}

export default ViewTeacherInfo;