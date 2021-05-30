import React, { Component } from 'react';
import Home from './homepage/HomeComponent';
import Header from './HeaderComponent';
import Footer from '../footer/FooterComponent';
import StickyFooter from './StickyFooterComponent';
// import HomePageComponent from './homepage/HomePageComponent';
import TeacherInfo from './teacher/TeacherInfo';
import findTeacher from './forms/findTeacher';
import FindClass from './forms/findClass';
import TeacherRegs from './list/teacherRegs';
import StudentRegs from './list/studentRegs';
import NewStudentRegs from './list/newStudentRegs'

import NewHeader from './header/NewHeaderComponent';
import NewTeacherInfo from './teacher/NewTeacherInfo';
import StudentInfo from './student/StudentInfo';
import SetupProfile from './profile/SetupProfile';

import Upload from './teacher/Upload';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCourseInfo ,teacherRegStudent, studentRegTeacher, updateProfile ,postProfile ,fetchProfile ,signUp  ,fetchTeacherReg, fetchStudentReg,
      loginUser, logoutUser} from '../redux/ActionCreators'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import DetailModal from './teacher/DetailModal';

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
    profiles: state.profiles,
    courseInfo: state.courseInfo,
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

  studentRegTeacher: (teacherId)=>{dispatch(studentRegTeacher(teacherId))},
  teacherRegStudent: (studentId)=>{dispatch(teacherRegStudent(studentId))},

  fetchCourseInfo:()=>{dispatch(fetchCourseInfo())},
///////////
  fetchProfile: ()=>{dispatch(fetchProfile())},
  postProfile: (props)=>{dispatch(postProfile(props))},
  updateProfile: (props)=>{dispatch(updateProfile(props))},
  //Log in/out
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
})


class Main extends Component{
    componentDidMount(){
    this.props.fetchTeacherReg();
    this.props.fetchStudentReg();
    // this.props.fetchTeacherProfile();
    // this.props.fetchStudentProfile();
    this.props.fetchProfile();
    this.props.fetchCourseInfo();
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
      console.log('inside render', props.profile);
      if(props.profile.isTeacher && !props.profile.isStudent){
        console.log('inside render profile tea');
        return <NewTeacherInfo
          {...props}
      />}
      else if (!props.profile.isTeacher && props.profile.isStudent){
        return <StudentInfo
          {...props}
        />
      }
      else {
        return <div></div>
      }
    }

    const RenderHeader = (props) => {
      const {profile} = props;
      var name="";
      if (profile.isTeacher && !profile.isStudent){
        name = profile.teacherProfile.name;
      }
      else if (!profile.isTeacher && profile.isStudent){
        name = profile.studentProfile.name;
      }
      return <NewHeader
        name = {name}
        {...props}
      />
    }

    const CheckStepper = () => {
      if (this.props.profiles.isEmpty && this.props.location.pathname != '/stepper'){
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

      if(teaProfile){
        return <RenderProfile
        profile={teaProfile}
      />
      }
      else if(stuProfile){
        return <RenderProfile
        profile={stuProfile}/>
      }
    }

    return (
      <div>      
        <CheckStepper/>
        <RenderHeader
        profile={this.props.profiles.profiles}
        auth={this.props.auth}
        loginUser={this.props.loginUser}
        logoutUser={this.props.logoutUser}
        signUp={this.props.signUp}
        isEmpty={this.props.profiles.isEmpty}
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
                register={this.props.studentRegTeacher}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                />}/>
                <Route path="/teacherList/:subjectName" component={({match}) => <TeacherRegs teacherRegs={this.props.teacherRegs.teacherRegs.map((teacher)=>teacher.teacherProfile)}
                register={this.props.studentRegTeacher}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                subjectName={match.params.subjectName}
                />}/>

                <Route path="/studentList" component={() => <NewStudentRegs 
                studentRegs={this.props.studentRegs.studentRegs.map((student)=>student.studentProfile)}
                register={this.props.teacherRegStudent}
                isLoading = {this.props.studentRegs.isLoading}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                />}/>

              
                <Route path='/findTeacher' component={findTeacher}/>
                <Route path='/findClass' component={() => <FindClass/>}/>
                
            

                <Route exact path="/newInfo" component={()=><RenderProfile
                  profile={this.props.profiles.profiles}
                  isLoading={this.props.profiles.isLoading}
                  errMess={this.props.profiles.errMess}
                  updateProfile={this.props.updateProfile}
                />}/>

                <Route path="/newInfo/:profileId" component={RenderViewProfile}/>

                <Route path='/upload' component={()=><Upload/> }/>

                <PrivateRoute path="/newteacherInfo" component={()=> <StudentInfo 
                      profile={this.props.profiles.profiles}
                      isLoading={this.props.profiles.isLoading}
                      errMess={this.props.profiles.errMess}
                />}/>

                {/* <Route path="/newstudentList" component={() => <NewStudentRegs 
                studentRegs={this.props.studentRegs.studentRegs.map((student)=>student.studentProfile)}
                register={this.props.teacherRegStudent}
                isLoading = {this.props.studentRegs.isLoading}
                auth={this.props.auth.isAuthenticated}
                profile={this.props.profiles.profiles}
                />}/> */}

                <Route path="/detailmodal" component={() => <DetailModal/>}/>
                <Route path="/stepper" component={()=><SetupProfile 
                setupProfile = {this.props.postProfile}
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

