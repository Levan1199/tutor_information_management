import React, { Component } from 'react';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import TeacherRegs from './list/TeacherRegs';
import StudentRegs from './list/StudentRegs'

import HeaderComponent from './HeaderComponent';
import TeacherInfo from './teacher/TeacherInfo';
import StudentInfo from './student/StudentInfo';
import SetupProfile from './profile/SetupProfile';

import ViewStudentInfo from './viewProfile/StudentInfo';
import ViewTeacherInfo from './viewProfile/TeacherInfo';

import RegisteredList from './student/RegisteredList';
import TeaRegisteredList from './teacher/RegisteredList';

import {Loading} from './LoadingComponent';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { removeTeacherAwait ,removeStudentAwait  ,fetchTeacherAwait ,teacherAwait ,fetchStudentAwait ,studentAwait ,loginWithFacebook,fetchCourseInfo , updateProfile ,postProfile ,fetchProfile ,signUp  ,fetchTeacherReg, fetchStudentReg,
      loginUser, logoutUser} from '../redux/ActionCreators'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import CourseDetail from './CourseDetail';
import Courses from './Courses';
import Map from './Map';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
    profiles: state.profiles,
    courseInfo: state.courseInfo,
    awaiting: state.awaiting,
    // comments: state.comments,
    // favorites: state.favorites,
    auth: state.auth,
  }   
}

const mapDispatchToProps = dispatch => ({
  // postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  // postFeedback: (firstName, lastName, tel, email, agree, feedback) => dispatch(postFeedback(firstName, lastName, tel, email, agree, feedback)),
  // resetFeedbackForm: ()=>{
  //   dispatch(actions.reset('feedback'))
  // },
  signUp:(creds)=>dispatch(signUp(creds)),
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  fetchStudentReg: ()=>{dispatch(fetchStudentReg())},

  removeStudentAwait: (connecting)=>{dispatch(removeStudentAwait(connecting))},
  removeTeacherAwait: (connecting)=>{dispatch(removeTeacherAwait(connecting))},

  studentAwait: (connecting)=>{dispatch(studentAwait(connecting))},
  fetchStudentAwait: ()=>{dispatch(fetchStudentAwait())},
  teacherAwait: (connecting)=>{dispatch(teacherAwait(connecting))},
  fetchTeacherAwait: ()=>{dispatch(fetchTeacherAwait())},

  fetchCourseInfo:()=>{dispatch(fetchCourseInfo())},
///////////
  fetchProfile: ()=>{dispatch(fetchProfile())},
  postProfile: (props)=>{dispatch(postProfile(props))},
  updateProfile: (props)=>{dispatch(updateProfile(props))},
  //Log in/out
  loginWithFacebook: (accessToken) => dispatch(loginWithFacebook(accessToken)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
})


class Main extends Component{
 
    componentDidMount(){
    this.props.fetchTeacherReg();
    this.props.fetchStudentReg();
    this.props.fetchProfile();
    this.props.fetchCourseInfo();
    this.props.fetchTeacherAwait();
    this.props.fetchStudentAwait();    
  }

 

  render(){
    
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );

    const RenderProfile = (props) => {
      if(props.profile.isTeacher && !props.profile.isStudent){
        return <TeacherInfo
          {...props}
      />}
      else if (!props.profile.isTeacher && props.profile.isStudent){
        return <StudentInfo
          {...props}
        />
      }
      else {
        return <Loading/>
      }
    }

    const RenderHeader = React.forwardRef((props, ref) => {
      const {profile} = props;
      var name="";
      var imgPath="";
      if (profile.isTeacher && !profile.isStudent){
        name = profile.teacherProfile.name;
        imgPath = profile.teacherProfile.imgPath;
      }
      else if (!profile.isTeacher && profile.isStudent){
        name = profile.studentProfile.name;
        imgPath = profile.studentProfile.imgPath;
      }
      return <HeaderComponent
        name = {name}
        {...props}
        imgPath = {imgPath}
      />
    })

    const CheckStepper = () => {
      if (this.props.profiles.isEmpty && this.props.location.pathname !== '/stepper'){
         this.props.history.push('/stepper');
         return <div></div>;
      }    
      else{
        return <div></div>;
      }
    }
    
    const RenderViewProfile = ({match}) => {
      const teaProfile = this.props.teacherRegs.teacherRegs.filter((teacher)=>teacher.teacherProfile._id===match.params.profileId)[0];
      const stuProfile = this.props.studentRegs.studentRegs.filter((student)=>student.studentProfile._id===match.params.profileId)[0];

      const awaiting = this.props.awaiting.awaiting;

      if(teaProfile){
        const awaitList = awaiting.filter((teacher)=>teacher.teacherId._id === teaProfile.teacherProfile._id);
        const awaitObj = awaitList.filter((student)=>student.studentId === this.props.profiles.profiles.studentProfile._id)[0];
        const isTeacherId=(awaitObj)?true:false;

        return <ViewTeacherInfo
        teaProfile={teaProfile}        
        isTeacherId={isTeacherId}

        remove={this.props.removeStudentAwait}

        register={this.props.studentAwait}
        auth={this.props.auth.isAuthenticated}
        profile = {this.props.profiles.profiles}
      />
      }
      else if(stuProfile){
        const awaitList = awaiting.filter((student)=>student.studentId._id === stuProfile.studentProfile._id);
        const awaitObj = awaitList.filter((teacher)=>teacher.teacherId === this.props.profiles.profiles.teacherProfile._id)[0];
        const isStudentId=(awaitObj)?true:false;

        return <ViewStudentInfo
        stuProfile={stuProfile}
        isStudentId={isStudentId}
        remove={this.props.removeTeacherAwait}

        register={this.props.teacherAwait}
        auth={this.props.auth.isAuthenticated}
        profile = {this.props.profiles.profiles}
        />
      }
      else{
        return <Loading/>
      }
    }
    
   
    return (
      <div>      
        <CheckStepper/>
        <ToastContainer position="top-center" autoClose={3000}/>
        <RenderHeader
        profile={this.props.profiles.profiles}
        auth={this.props.auth}
        loginUser={this.props.loginUser}
        logoutUser={this.props.logoutUser}
        signUp={this.props.signUp}
        isEmpty={this.props.profiles.isEmpty}
        loginWithFacebook={this.props.loginWithFacebook}
        />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={()=><Home courseInfo={this.props.courseInfo.courseInfo}
                isLoadingCourse = {this.props.courseInfo.isLoading}
                teacherRegs={this.props.teacherRegs.teacherRegs.map((teacher)=>teacher.teacherProfile)}
                isLoadingTech = {this.props.teacherRegs.isLoading}
                />}/>
                <Route exact path="/teacherList" component={() => <TeacherRegs teacherRegs={this.props.teacherRegs.teacherRegs.map((teacher)=>teacher.teacherProfile)}
                register={this.props.studentAwait}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                awaiting={this.props.awaiting.awaiting}
                />}/>
                <Route path="/teacherList/:subjectName" component={({match}) => <TeacherRegs teacherRegs={this.props.teacherRegs.teacherRegs.map((teacher)=>teacher.teacherProfile)}
                register={this.props.studentRegTeacher}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                subjectName={match.params.subjectName}
                awaiting={this.props.awaiting.awaiting}
                />}/>

                <Route path="/studentList" component={() => <StudentRegs 
                studentRegs={this.props.studentRegs.studentRegs.map((student)=>student.studentProfile)}
                register={this.props.teacherAwait}
                isLoading = {this.props.studentRegs.isLoading}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                awaiting={this.props.awaiting.awaiting}
                />}/>                             
            
                <Route exact path="/profile" component={()=><RenderProfile
                  profile={this.props.profiles.profiles}
                  isLoading={this.props.profiles.isLoading}
                  errMess={this.props.profiles.errMess}
                  updateProfile={this.props.updateProfile}
                />}/>

                <Route path="/profile/:profileId" component={RenderViewProfile}/>             

                <Route path="/stepper" component={()=><SetupProfile 
                setupProfile = {this.props.postProfile}
                />}/>

                <Route path='/courseDetail/:courseName' component={({match})=><CourseDetail
                courseName={match.params.courseName}
                courseInfo={this.props.courseInfo.courseInfo}
                isLoadingCourse = {this.props.courseInfo.isLoading}
                /> }/> 
                <Route path='/courses' component={()=><Courses
                  courseInfo={this.props.courseInfo.courseInfo}
                  isLoadingCourse = {this.props.courseInfo.isLoading}
                />}/> 

                <Route exact path='/map' component={()=><Map/>}/> 
                <Route path='/map/:address' component={({match})=><Map address={match.params.address}/>}/> 

                <PrivateRoute path='/awaiting' component={()=><RegisteredList 
                  errMess = {this.props.awaiting.errMess}
                  awaiting = {this.props.awaiting.awaiting}
                  isLoading = {this.props.awaiting.isLoading}
                  remove = {this.props.removeStudentAwait}         
                />}/> 

                <PrivateRoute path='/teaAwaiting' component={()=><TeaRegisteredList 
                  errMess = {this.props.awaiting.errMess}
                  awaiting = {this.props.awaiting.awaiting}
                  isLoading = {this.props.awaiting.isLoading}
                  remove ={this.props.removeTeacherAwait}
                />}/> 
                <Redirect to="/home"/>              
              </Switch>
            </CSSTransition>
        </TransitionGroup>  
      <Footer/>          
      </div>
    );
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Main));

