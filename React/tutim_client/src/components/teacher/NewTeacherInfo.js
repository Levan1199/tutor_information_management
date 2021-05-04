import React from "react";
import {avatarUrl} from "../../shared/baseUrl";
import { Avatar, Grid, Typography, Button, Box, Modal , Divider, FormControlLabel, Checkbox, Radio, RadioGroup} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
import { Paper,  TextField, Link } from '@material-ui/core'
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup"; 
import IntroModal from "./IntroModal";
import DetailModal from "./DetailModal";

const useStyles = makeStyles(theme => ({
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

const NewTeacherInfo = (props) => {
    const classes = useStyles();
    const [modalIntro, setModalIntro] = React.useState(false);
    const [modalDetail, setModalDetail] = React.useState(false);


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
    const {teacherProfile} = props.profile;
    const grade = teacherProfile.grade?teacherProfile.grade.join(', '):"";
    const subject = teacherProfile.subject?teacherProfile.subject.join(', '):"";
    const district = teacherProfile.district?teacherProfile.district.join(', '):"";
    return (
        <div className={classes.root}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                    <Avatar className={classes.profileImg} src=
                    {avatarUrl+teacherProfile.imgPath}
                    alt="Teacher Avatar"/>                   
                </Grid>

                <Grid item md={12} lg={8}>
                    <Typography variant="h2">
                            {teacherProfile.name}
                    </Typography>
                    <Typography variant="h4">
                            {teacherProfile.email}
                    <Divider light/>
                    </Typography>   
                    
                    <Typography variant="h6">
                            Mo ta: {teacherProfile.description}
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
                <Divider light/>
                </Grid>
            </Grid>
            
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={6}>
                    <Typography variant="h6">Class information</Typography>
                    <Typography variant="body1">
                        Các Lớp: {grade}
                    </Typography>        
                    <Typography variant="body1">
                        Môn học: {subject}
                    </Typography>  
                    <Typography variant="body1">
                        Khu vực: {district}
                    </Typography>  
                    <Typography variant="body1">
                        Học phí: {teacherProfile.fee}
                    </Typography>  
                </Grid>

                <Grid item md={12} lg={5}>
                    <Typography variant="h6">
                        Schedule 
                    </Typography>           
                    {checkBoxValues.map(obj => (
                        <RenderCheckBox label={obj.label}
                        value={obj.value}
                        weekly = {teacherProfile.weekly}/>
                    ))}   
                    <Typography variant="body1">
                        Available: 
                        <RadioGroup row aria-label="position" name="available" defaultValue="top"
                            defaultChecked={teacherProfile.available}
                        >
                            <FormControlLabel
                                value='true'
                                control={<Radio name="available" checked={teacherProfile.available==true}/>}
                                label="Yes"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='false'
                                control={<Radio name="available" checked={teacherProfile.available==false} />}
                                label="No"
                                labelPlacement="top"
                            />
                        </RadioGroup>
                    </Typography> 
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
        </div>  
    );
    }
}

export default NewTeacherInfo;