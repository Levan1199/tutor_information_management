import React from "react";
import { Avatar, Grid, Typography, Button, Box, Modal } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
import { Paper,  TextField, Link } from '@material-ui/core'
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup"; 
import IntroModal from "./IntroModal";
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
  }));

// const Intro = ({handleInput, closeModal, loginUser}) =>{
//     const initialValues = {
//         username: '',
//         email: '',
//         description: ''
//     }

//     const inputBar = ({field, form, type, ...props}) => {
//         const {name} = field;
//         const helpText = "please input " + name;
//         return (
//             <>
//             <TextField type={type} name={name} placeholder={helpText} fullWidth margin="normal"
//             onChange = {(evt)=>form.setFieldValue(name, evt.target.value)}
//             />
//             <ErrorMessage name={name}/>
//             </>
//         );
//     }
    
//     return(
//         <Paper elevation={10} className={classes.paperStyle}>
//             <Formik 
//             initialValues={initialValues}
//             onSubmit={ (values, actions) => handleInput(values, actions, loginUser, closeModal) }
//             >
//                 <Form >
//                     <Field 
//                         component={inputBar}
//                         name="username"
//                         type="text"
//                     />
//                     <Field 
//                         component={inputBar}
//                         name="email"
//                         type="email"
//                     />
//                     <Field 
//                         component={inputBar}
//                         name="description"
//                         type="text"
//                     />
//                     <Button type="submit" fullWidth>Sign in</Button>
//                 </Form>
//             </Formik>
//         </Paper>           
//     );
// }

const NewTeacherInfo = (props) => {
    console.log('check loading: ',props.isLoading);
    const classes = useStyles();
    const [modalIntro, setModalIntro] = React.useState(false);
    const [modalDetail, setModalDetail] = React.useState(false);

    const openIntro = () => {
        setModalIntro(true);
    };

    const closeIntro = () => {
        setModalIntro(false);
    };

    const openDetail = () => {
        setModalDetail(true);
    };

    const closeDetail = () => {
        setModalDetail(false);
    };
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
    // if (props.profile != null)
    else if (props.profile != null) {  
        console.log('connect ',props);
    const {teacherProfile} = props.profile;
    console.log('type ',teacherProfile);
    const grade = teacherProfile.grade.join(', ');
    const subject = teacherProfile.subject.join(', ');
    const district = teacherProfile.district.join(', ');
    return (
        <div className={classes.root}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                    <Avatar className={classes.profileImg} src="/assets/images/download.png" alt="Teacher Avatar"/>                   
                </Grid>

                <Grid item md={12} lg={8}>
                    <Typography variant="h2">
                            {teacherProfile.name}
                    </Typography>
                    <Typography variant="h4">
                            {teacherProfile.email}
                            <hr/>
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
                    <Button onClick={openIntro}><EditIcon/></Button>    
                </Box>
                <Grid item md={12}>
                <Typography><hr/></Typography>
                </Grid>
            </Grid>
            
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={6}>
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
                        Đang hoạt động 
                    </Typography>        
                    <Typography variant="body1">
                        Thời gian: {teacherProfile.time}
                    </Typography>     
                </Grid>
                <Box
                    component={Grid}
                    item
                    md={12} lg={1}
                    display={{ md: "none", lg: "block" }}
                >
                    <Button onClick={openDetail}><EditIcon/></Button>    
                </Box>
            </Grid>         
            <Modal
            open={modalIntro}
            onClose={closeIntro}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <IntroModal closeModal={closeIntro} updateTeacherReg={props.updateTeacherReg}/>              
            </Modal>    
            <Modal
            open={modalDetail}
            onClose={closeDetail}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                
            <div>detail</div>
            </Modal>    
        </div>  
    );
    }
}

export default NewTeacherInfo;