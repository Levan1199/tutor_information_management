
import React, { useEffect, useState } from 'react';
import {Loading} from '../LoadingComponent';
import {Button, Container, Grid, Typography, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {avatarUrl} from "../../shared/baseUrl";
import {connect} from 'react-redux';
import {fetchStudentAcc, disableStudentAcc} from '../../redux/ActionCreators'

const mapStatetoProps = state =>{
  return{
    managerStudentProfiles: state.managerStudentProfiles,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchStudentAcc:()=>{dispatch(fetchStudentAcc())},
  disableStudentAcc: (userId) =>{dispatch(disableStudentAcc(userId))}
})
 
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
    }
}));

const ComplexGrid = (props) => {
    const classes = useStyles();
    const profile = props.profile.studentProfile;
    let subject = (profile.subject)?profile.subject.join(', '):"";
    const district = profile.district?profile.district.join(', '):""; 
    const decorate = (props.profile.isDisable)?classes.paper2:classes.paper;
    const disableButton = (props.profile.isDisable)?"Disabled":"Disable";
    const handleClick = () => {
      const userId = props.profile._id;
      return props.disable(userId);
  }
    return (      
        <Paper className={decorate}> 
          <Grid container justify="center" spacing={2}>
            <Grid item sm={2}>
              <div className={classes.image}>
                <img className={classes.img} alt="Teacher" src={avatarUrl+profile.imgPath} />
              </div>
            </Grid>
            <Grid item sm={8} container>
              <Grid item container direction="column" spacing={2}>
                <Grid item >
                  <Typography variant="h6">
                    {profile.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    ID: {profile._id}
                  </Typography>                  
                  <Typography variant="body2">
                    {subject}
                  </Typography>
                  <Typography variant="body2">
                    {district}
                  </Typography>
                  <Typography variant="body2">
                    {profile.fee}
                  </Typography>
                  <Typography variant="body2">
                    {profile.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <Link  to={`/profile/student/${profile._id}`}>
                    <Button variant="contained" color="secondary">
                      More Information
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2}>
              <Button variant="contained" className={classes.disableButton} onClick={handleClick}>
                {disableButton}
              </Button>
            </Grid>
          </Grid>
        </Paper>
       
    );
  }

const AdminStudentList = (props) =>{      
    const classes = useStyles();
    const {fetchStudentAcc, managerStudentProfiles, disableStudentAcc} = props;

    useEffect(()=>{
      async function fetchData(){
        return await fetchStudentAcc();
      }
      fetchData();
    },[]);

    const [students, setStudents] = useState(null);

    useEffect(()=>{        
      setStudents(managerStudentProfiles.managerStudentProfiles);
    },[managerStudentProfiles])

    console.log(students);

    if(!students || students.length==0){
      console.log('loading');  
        return <Loading/>
    }
    else{
        return (
            <Container maxWidth={false} className={classes.main}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" className={classes.headerText}>
                    Current student accounts
                </Typography>
            </Box>
            <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                        <Grid container direction="row" spacing={2} justify="center">
                        {(()=>{
                            return students.map((student, index)=>{               
                              return (
                                  <Grid item xs={12} key={index}>
                                    <ComplexGrid profile={student} disable={disableStudentAcc}/>
                                  </Grid>
                                );                                
                            })
                        })()}
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AdminStudentList);