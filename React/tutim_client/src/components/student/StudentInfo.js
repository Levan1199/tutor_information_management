import React from "react";
import { Avatar, Grid, Typography, Button, Box, Modal } from "@material-ui/core";
import {avatarUrl} from "../../shared/baseUrl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import { Loading } from '../LoadingComponent';
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


const StudentInfo = (props) => {
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
    else if (props.profile) {  
    const {studentProfile} = props.profile;
    return (
        <div className={classes.root}>
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} lg={3}>
                <Avatar className={classes.profileImg} src=
                    {avatarUrl+studentProfile.imgPath}
                    alt="Student Avatar"/>                      
                </Grid>

                <Grid item md={12} lg={8}>
                    <Typography variant="h2">
                            {studentProfile.name}
                    </Typography>
                    <Typography variant="h4">
                            {studentProfile.email}
                            <hr/>
                    </Typography>   
                    
                    <Typography variant="h6">
                            Mô tả: {studentProfile.description}
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
            
           
            <Modal
            open={modalIntro}
            onClose={closeIntro}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <IntroModal closeModal={closeIntro} updateProfile={props.updateProfile} {...studentProfile}/>              
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

export default StudentInfo;