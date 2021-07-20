import React, {useEffect} from "react";
import {avatarUrl} from "../../shared/baseUrl";
import { Avatar, Grid, Typography, Button, Box, Modal , Divider, FormControlLabel, Checkbox, Radio, RadioGroup, Container, Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
import IntroModal from "./IntroModal";
import DetailModal from "./DetailModal";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import {Link} from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import {connect} from 'react-redux';
import {fetchProfile, fetchComments} from '../../redux/ActionCreators'

const mapStatetoProps = state =>{
  return{
    profiles: state.profiles,
    comments: state.comments
  }   
}
const mapDispatchToProps = dispatch => ({
  fetchProfile:()=>{dispatch(fetchProfile())},
  fetchComments:()=>{dispatch(fetchComments())},
})

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
  },
  cmt:{
    fontFamily:"Segoe UI",
    fontWeight:"medium",
},
paper: {
    padding:'2px',
    maxWidth: '100%',
    backgroundColor: '#f5f5f5',      
},
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

const StarRating = ({rating}) => {      
    const classes = useStyles();
    return (
        <>
            {[...Array(5)].map((star, i)=>{
                const ratingValue = i+1;
                return (
                    <>
                    <label>
                        <StarIcon className={classes.star}
                        style={{fill: ratingValue <= (rating) ? "#ffc107":"#e4e5e9"}}
                        />
                    </label>                        
                    </>
                )
            })}  
        </>
    );
}

const Comment = ({cmt}) =>{
    const classes = useStyles();
    
    return (
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
                    rate:  {cmt.rating}/5
                </Typography>                  
                <Typography variant="body2" className={classes.cmt}>
                    {cmt.comment}
                </Typography>
                </Grid>                
            </Grid>
        </Grid>
        </Paper>
      );
}

const RenderUI = (props) => {
    const classes = useStyles();
    const [modalIntro, setModalIntro] = React.useState(false);
    const [modalDetail, setModalDetail] = React.useState(false);

    const {teacherProfile} = props.profile;
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

                <Grid item md={12} lg={8}>
                    <Typography variant="h2" className={classes.headerText}>
                            {teacherProfile.name}
                    </Typography>
                    <StarRating rating={props.rating}/>
                    <Typography variant="h6" className={classes.normalText}>
                        <MailIcon/> Email : {teacherProfile.email}                   
                    </Typography>   
                    <Typography variant="h6" className={classes.normalText}>
                        <PhoneIcon/> Phone : {teacherProfile.telnum}                   
                    </Typography>   

                    <Divider/>
                    
                    <Typography variant="h5" className={classes.normalText}>
                            Description: {teacherProfile.description}
                    </Typography>     
                  
                </Grid>

                <Box
                    component={Grid}
                    item
                    md={12} lg={1}
                    display={{ md: "none", lg: "block" }}
                >
                    <Button onClick={()=>setModalIntro(true)}><EditIcon/></Button>    
                </Box>
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
                        <Link to={`/teaAwaiting`}><Button variant="contained" color="primary">View teachers you registered! <SubdirectoryArrowLeftIcon/> </Button></Link>
                    </Grid> 
                </Grid>
                <Box
                    component={Grid}
                    item
                    md={12} lg={1}
                    display={{ md: "none", lg: "block" }}
                >
                    <Button onClick={()=>setModalDetail(true)}><EditIcon/></Button>    
                </Box>
            </Grid>         

            <Modal
            className={classes.modal}
            open={modalIntro}
            onClose={()=>setModalIntro(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <IntroModal closeModal={()=>setModalIntro(false)} {...teacherProfile}/>              
            </Modal>    

            <Modal
                className={classes.modal}
                open={modalDetail}
                onClose={()=>setModalDetail(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <DetailModal closeModal={()=>setModalDetail(false)} {...teacherProfile}/>   
            </Modal>    
            </Container>

            <Container maxWidth="lg" className={classes.container}>
               
               <Grid container justify="center" spacing={2}>
                   <Grid item xs={12}> 
                       <Typography variant="h4" className={classes.headerText} color="secondary">
                           Comments:                 
                       </Typography>                 
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

const TeacherInfo = (props) => {
    const {profiles, updateProfile, comments, fetchComments} = props;

    useEffect(()=>{
        async function fetchData(){
            return await fetchComments();
        }
        fetchData();
    },[]);
   
    if (!profiles.profiles || profiles.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else {  
        const cmt = comments.comments.filter((comment)=>comment.commentTo===profiles.profiles.teacherProfile._id);
        const rate = (profiles.profiles.teacherProfile.rate / profiles.profiles.teacherProfile.commentCount).toFixed(1);   
        return (
            <RenderUI profile={profiles.profiles} updateProfile={updateProfile}  cmt = {cmt} rating={rate} />
        );   
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(TeacherInfo);