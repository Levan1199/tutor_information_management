
import React from 'react';
import {Button, Container, Grid, Typography, Box, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
import PostCourse from './PostCourse'; 

const useStyles = makeStyles((theme)=>({
    text:{
        fontWeight: "bold",
        fontSize: "30px",
        color: theme.palette.primary.dark
    },
    container:{
        padding:"20px 0px"
    },
    header:{
        paddingBottom: "10px"
    },
    button:{
        height:"50px",
        width:"75px"
    } ,
    main:{
        padding:0,
        minHeight:"100vh",
        backgroundColor: "#f5f5f5"
    },
    box:{
        width:"100%",
        padding:"20px 0",
        backgroundColor:theme.palette.secondary.light
    },
    normalText:{
      fontFamily:"Segoe UI",
      fontWeight:"medium",
      fontSize:"1.5rem",
    },
    headerText:{
        fontWeight: "bold",
        fontFamily:"Roboto",
        color: theme.palette.primary.dark
    },
    card:{
        minHeight:"265px",
        maxHeight:"265px"
    },
    
    cardcontent: {
        "&:last-child": {
        paddingTop: 0
        }
    },

    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '80%',
      backgroundColor: theme.palette.secondary.light
    },
    paper2:{
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '80%',
      backgroundColor: "#dcdcdc"
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    disableButton:{
      backgroundColor: theme.palette.warning.main
    },
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
}));

const AdminView = (props) =>{      
    const classes = useStyles();
    const [postCourse, setPostCourse] = React.useState(false);
   
    return (
        <Container maxWidth={false} className={classes.main}>
        <Box className={classes.box}>
            <Typography variant="h4" align="center" className={classes.headerText}>
                Admin View
            </Typography>
            <Typography variant="body1" align="center" className={classes.normalText}>
                Management 
            </Typography>
        </Box>
        <Container maxWidth="lg" className={classes.container}>
            <Grid container xs={12} spacing={1}>
                <Grid item>
                  <Link to="/admin/studentList">
                    <Button variant="contained" color="primary">Student List</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/admin/teacherList">
                    <Button variant="contained" color="primary">Teacher List</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/courses">
                    <Button variant="contained" color="primary">Courses</Button>
                  </Link>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={()=>setPostCourse(true)}>Post Course</Button>
                </Grid>
            </Grid>
            </Container>

            <Modal
            className={classes.modal}
            open={postCourse}
            onClose={()=>setPostCourse(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <PostCourse closeModal={()=>setPostCourse(false)} />              
            </Modal>    

        </Container>
    );
    
}

export default AdminView;