
import React, { useEffect, useState } from 'react';
import {avatarUrl} from '../../shared/baseUrl';
import {Loading} from '../LoadingComponent';
import {Card, CardHeader, CardContent, Button, Container, Grid, Typography, Divider, Box, Avatar} from '@material-ui/core';
import {Multiselect} from 'multiselect-react-dropdown';
import { Formik, Form,  FastField } from "formik";
import * as FilterField from '../../shared/constValues';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import "./findBar.css";
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import {connect} from 'react-redux';
import {fetchStudentReg, teacherAwait, fetchTeacherAwait} from '../../redux/ActionCreators'
import SearchIcon from '@material-ui/icons/Search';
const mapStatetoProps = state =>{
  return{
    studentRegs: state.studentRegs,
    auth: state.auth,
    profiles: state.profiles,
    awaiting: state.awaiting,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchStudentReg:()=>{dispatch(fetchStudentReg())},
  teacherAwait: (connecting)=>{dispatch(teacherAwait(connecting))},
  fetchTeacherAwait:()=>{dispatch(fetchTeacherAwait())},
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
        backgroundColor:"#efefef",
        padding:0,
        minHeight:"100vh"
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
        minHeight:"240px",
        maxHeight:"240px",
    },
    
    cardcontent: {
        "&:last-child": {
        padding: 0    
        }
    },
    cardText:{
        fontFamily:"Roboto",
        fontWeight:"medium",
        color: theme.text.title,
    },
    cardTextBody:{
        fontFamily:"Roboto",
        fontWeight:"bold",
        color: theme.text.body
    },
    cardTop:{
        padding: "0 10px",
        backgroundColor:  "#d2e9f3",
        border: "2px solid #aed7e9"      
    },
    cardBottom:{
        padding: "0 10px",
    },
    regButton:{
        backgroundColor:'#ffc334',
        color:"white",
        '&:hover': {
            backgroundColor: '#f2a900',
        },
    },
    headerName:{
        fontFamily:"Roboto",
        color:theme.text.body,
        fontWeight:"bold",
        fontSize:"1.3rem"
    },
    findLink:{
        fontFamily:"Roboto",
        color:theme.palette.primary.main,
        fontWeight:"bold",
    }

}));

const multiSelectDropdown = ({field,placeholder, form, meta, option, ...props})=>{
    const optionName = field.name;
    return (
        <Multiselect
            options={option}
            showArrow
            displayValue="name" 
            placeholder={placeholder}
            showCheckbox
            onSelect={(value)=>{
                form.setFieldValue(optionName,value);
            }}
        />
    );
}

const filterProps = (filterVals,student) => {
    const dist = filterVals.district.every((e=>{
        return student.district.includes(e);
    }));

    const grade = filterVals.grade.every((e=>{
        return student.grade.includes(e);
    }));

    const subject = filterVals.subject.every((e=>{
        return student.subject.includes(e);
    }));

    const result = dist && grade && subject;
    return result;

}


const handleRegister = (register, studentId, auth, teacherId) =>{
    const connecting = {studentId: studentId, teacherId: teacherId};
    if (!auth){
        toast.error("You need to login!");      
    }
    else if(!teacherId){
        toast.error("Only teacher can register"); 
    }
    else {
        register(connecting);
        toast.success('Register successfully');
    }
}

const isInclude = (arr, teaId) =>{        
    const temp = arr.map(student=>student.studentId._id);
    const index = temp.indexOf(teaId);
    if(index === -1)
        return false;
    else return true;
}

function RenderStudentCard({student, auth, profile,register, awaiting}){
    const editStyle = useStyles();
    let subject = student.subject.join(', ');
    let dist = student.district.join(',');
    let fee = (student.fee)?student.fee.toLocaleString():""
    let grade = student.grade.join(', ');

    let teacherId="";
    if(profile && profile.teacherProfile){
        teacherId = profile.teacherProfile._id;
    }

    return(
        <Card className={editStyle.card}>            
            <CardHeader 
                className={editStyle.headerBg}
                avatar={<Avatar alt="avatar" src={avatarUrl+student.imgPath}/>}
                subheader={<Link style={{textDecoration: 'none'}} className={editStyle.headerName}  to={`/profile/student/${student._id}`}>{student.name}</Link>}               
                action={
                    (                                                
                        isInclude(awaiting, student._id)
                    )?
                    <Button color="secondary" variant="contained">Connecting</Button>
                    :<Button className={editStyle.regButton} variant="contained" onClick={()=>
                        handleRegister(register,student._id,auth, teacherId)
                    }>Register</Button>
                }
            />
            <CardContent className={editStyle.cardcontent}>       
                <Box className={editStyle.cardTop}>
                    <Grid container justify="space-between">  
                        <Grid item xs={2}>
                            <Typography className={editStyle.cardText} align="left"> Subject: </Typography>                            
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={editStyle.cardTextBody} noWrap align="right">{subject}</Typography>
                        </Grid>
                    </Grid>                 
                    <Grid container justify="space-between">  
                        <Grid item xs={2}>  
                            <Typography className={editStyle.cardText} align="left"> District: </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={editStyle.cardTextBody} noWrap align="right">{dist}</Typography>
                        </Grid>                        
                    </Grid>
                    <Grid container justify="space-between">  
                        <Grid item xs={2}>
                            <Typography className={editStyle.cardText} align="left"> Grade: </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={editStyle.cardTextBody} noWrap align="right">{grade}</Typography>
                        </Grid>
                    </Grid>
                </Box>                     
                <Box className={editStyle.cardBottom}>
                    <Grid container justify="space-between">  
                        <Typography className={editStyle.cardText} display="inline">Recommend Tuition Fee: </Typography>
                        <Typography className={editStyle.cardTextBody} display="inline">{fee}</Typography>
                    </Grid>

                    <Grid container justify="space-between">  
                        <Grid item xs={2}>
                            <Typography className={editStyle.cardText} align="left"> Address: </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={editStyle.cardTextBody}  noWrap align="right">
                                <Link className={editStyle.findLink} style={{textDecoration:"none", textDecorationColor:"none"}}to={`/map/${student.address}`}> Find<SearchIcon/></Link>{student.address} 
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container justify="space-between">  
                        <Grid item xs={2} >
                            <Typography className={editStyle.cardText} align="left">Description:</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography className={editStyle.cardTextBody}  noWrap align="right">
                                {student.description}
                            </Typography>
                        </Grid>
                    </Grid>                
                </Box>            
            </CardContent> 
        </Card>
    );
}




const StudentRegs = (props) =>{      
    const classes = useStyles();
    const {fetchStudentReg, studentRegs, fetchTeacherAwait} = props;

    useEffect(()=>{       
        window.scrollTo(0,0);
        async function fetchData(){
            await fetchStudentReg();
            return await fetchTeacherAwait();
        }
        fetchData();    
    },[]);

    const [filterVals, setFilterVals] = useState({ district:[],  grade:[],  subject:[]})
    const [foundStudents, setFoundStudents] = useState();

    useEffect(()=>{
        const temp = studentRegs.studentRegs.filter((student)=>{
            return filterProps(filterVals, student);
        });
        setFoundStudents(temp);
    },[studentRegs, filterVals])    

    const handleSubmit = (values) => {
        var filterName = {};
            filterName.district = values.district.map(district=>district.name);
            filterName.grade = values.grade.map(grade=>grade.name);
            filterName.subject = values.subject.map(subject=>subject.name);
        setFilterVals(filterName);
    }

    const ScrollData = () =>{
        const [tempArr, setTempArr] = useState(foundStudents);
        const [tempDataLength, setTempDataLength] = useState(tempArr.slice(0,5));
        
        const fetchData = () => {      
            const moreFive = tempArr.slice(0,5);
            setTempDataLength((prev)=>[...prev,...moreFive])
            setTempArr(tempArr.slice(5,tempArr.length));
        }

        const checkLeft = () =>{
            if(tempDataLength.length < foundStudents.length){
                return true;
            }
            else return false;
        }
        return (
            <InfiniteScroll
            dataLength={tempDataLength.length} 
            next={fetchData}
            hasMore={checkLeft()}
            loader={<Loading/>}
            style={{"overflowY":"hidden","overflowX":"hidden" }}
            >
                <Grid container direction="row" spacing={1} justify="center" >
                    {tempDataLength.map((student, index)=>{
                        if(student.available){
                            return (
                                <Grid item xs={12} md={5} key={index}>
                                <RenderStudentCard student={student} register={props.teacherAwait} auth={props.auth} profile={props.profiles.profiles} awaiting={props.awaiting.awaiting}/>
                                </Grid>
                            );
                        }
                        else return null;
                    })}
                </Grid>                            

            </InfiniteScroll>

        )  
    }   



    if(!foundStudents){
        return <Loading/>
    }
    else{
        return (
            <Container maxWidth={false} className={classes.main}>
            <Box className={classes.box}>
                <Typography variant="h4" align="center" className={classes.headerText}>
                    Current classes
                </Typography>
                <Typography variant="body1" align="center" className={classes.normalText}>
                    Current classes that is in need of teachers
                </Typography>
            </Box>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.header}>
                        <Grid container spacing={1} className={classes.header}>
                            <Grid item xs={12} sm={9}>
                                <Formik initialValues={FilterField.stuInit}
                                onSubmit = {handleSubmit}
                                >
                                    <Form>
                                        <Grid container spacing={1} className={classes.multiSelect}>
                                            <Grid item xs={12} sm={3}>
                                                <FastField
                                                    id="district"
                                                    name="district"
                                                    component={multiSelectDropdown}
                                                    option={FilterField.distOption}
                                                    placeholder="District"
                                                />  
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FastField
                                                    id="grade"
                                                    name="grade"
                                                    component={multiSelectDropdown}
                                                    option={FilterField.gradOption}
                                                    placeholder="Grade"
                                                />  
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FastField
                                                    id="subject"
                                                    name="subject"
                                                    component={multiSelectDropdown}
                                                    option={FilterField.subjOption}
                                                    placeholder="Subject"
                                                />  
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Button 
                                                className={classes.button}
                                                color="secondary" type="submit" variant="contained"
                                                >Find</Button>  
                                            </Grid>                                            
                                        </Grid>
                                    </Form>
                                </Formik>
                            </Grid>
                        </Grid>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <ScrollData/>                      
                    </Grid>
                </Grid>
            </Container>
            </Container>
        );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(StudentRegs);