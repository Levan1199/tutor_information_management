import React, {useEffect} from "react";
import { Avatar, Grid, Typography, Button, Box, Modal, Container,FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {avatarUrl} from "../../shared/baseUrl";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
import IntroModal from "./IntroModal";
import DetailModal from "./DetailModal";
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

const RenderUI = (props) => {
    const classes = useStyles();
    const [modalIntro, setModalIntro] = React.useState(false);
    const [modalDetail, setModalDetail] = React.useState(false);
    const {studentProfile} = props.profile;

    const grade = studentProfile.grade?studentProfile.grade.join(', '):"";
    const subject = studentProfile.subject?studentProfile.subject.join(', '):"";
    const district = studentProfile.district?studentProfile.district.join(', '):""; 
    var fee = (studentProfile.fee)?(studentProfile.fee.toLocaleString()):0;
    return (
        <Container maxWidth="false" className={classes.main}>
            <Container maxWidth="lg" className={classes.container}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                <Avatar className={classes.profileImg} src=
                    {avatarUrl+studentProfile.imgPath}
                    alt="Student Avatar"/>                      
                </Grid>

                <Grid item md={12} lg={8}>
                    <Typography variant="h2" className={classes.headerText}>
                            {studentProfile.name}
                    </Typography>
                    <Typography variant="h4" className={classes.normalText}>
                            {studentProfile.email}
                            <hr/>
                    </Typography>   
                    
                    <Typography variant="h6" className={classes.normalText}>
                            Description: {studentProfile.description}
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
                <Typography><hr/></Typography>
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
                        <b>Address: </b>{studentProfile.address}
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
                <Box
                    component={Grid}
                    item
                    md={2}
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
                <IntroModal closeModal={()=>setModalIntro(false)} updateProfile={props.updateProfile} {...studentProfile}/>              
            </Modal>    

            <Modal
                className={classes.modal}
                open={modalDetail}
                onClose={()=>setModalDetail(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <DetailModal closeModal={()=>setModalDetail(false)} updateProfile={props.updateProfile} {...studentProfile}/>   
            </Modal>    
        </Container>
        </Container>
    );
}

const StudentInfo = (props) => {
    useEffect(()=>{
        if(props.profile){
            return (
                <RenderUI profile={props.profile} updateProfile={props.updateProfile}/>
            );
        }
    },[props.profile]);
    
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

export default StudentInfo;