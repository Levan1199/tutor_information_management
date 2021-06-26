import React, {useEffect} from "react";
import {avatarUrl} from "../../shared/baseUrl";
import { Avatar, Grid, Typography, Button, Box, Modal , Divider, FormControlLabel, Checkbox, Radio, RadioGroup, Container} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
import IntroModal from "./IntroModal";
import DetailModal from "./DetailModal";
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import {Link} from 'react-router-dom';

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
                    <Typography variant="h6" className={classes.normalText}>
                            Email: {teacherProfile.email}                   
                    </Typography>   
                    <Typography variant="h6" className={classes.normalText}>
                            Phone Number: {teacherProfile.telnum}                   
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
                <IntroModal closeModal={()=>setModalIntro(false)} updateProfile={props.updateProfile} {...teacherProfile}/>              
            </Modal>    

            <Modal
                className={classes.modal}
                open={modalDetail}
                onClose={()=>setModalDetail(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <DetailModal closeModal={()=>setModalDetail(false)} updateProfile={props.updateProfile} {...teacherProfile}/>   
            </Modal>    
            </Container>
        </Container>
    );
}

const TeacherInfo = (props) => {
  

    // useEffect(()=>{
    //     if(props.profile){
    //         return (
    //             <RenderUI profile={props.profile} updateProfile={props.updateProfile}/>
    //         );
    //     }
    // },[props.profile]);

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.profile) {  
        return (
            <RenderUI profile={props.profile} updateProfile={props.updateProfile}/>
        );   
    }
}

export default TeacherInfo;