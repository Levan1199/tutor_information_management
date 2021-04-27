import React, { Component } from 'react';
import Home from './homepage/HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

// import HomePageComponent from './homepage/HomePageComponent';
import TeacherInfo from './teacher/TeacherInfo';
import findTeacher from './forms/findTeacher';
import FindClass from './forms/findClass';
import TeacherRegs from './list/teacherRegs';
import StudentRegs from './list/studentRegs';

import NewHeader from './header/NewHeaderComponent';
import NewTeacherInfo from './teacher/NewTeacherInfo';
import StudentInfo from './student/StudentInfo';
import SetupProfile from './profile/SetupProfile';

import Upload from './teacher/Upload';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { updateProfile ,postProfile ,fetchProfile ,signUp  ,fetchTeacherReg, fetchStudentReg,
      loginUser, logoutUser} from '../redux/ActionCreators'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import DetailModal from './teacher/DetailModal';

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
    profiles: state.profiles,
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
  // fetchTeacherProfile: ()=>{dispatch(fetchTeacherProfile())},
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  // updateTeacherReg: (props)=>{dispatch(updateTeacherReg(props))},
  fetchStudentReg: ()=>{dispatch(fetchStudentReg())},
  // postTeacherProfile: (props)=>{dispatch(postTeacherProfile(props))},

  // postStudentProfile: (props)=>{dispatch(postStudentProfile(props))},
  // fetchStudentProfile: ()=>{dispatch(fetchStudentProfile())},
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
        return <NewTeacherInfo
          {...props}
      />}
      else if (!props.profile.isTeacher && props.profile.isStudent){
        console.log('inside else');
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
      console.log('render header ', props)
      var name="";
      if (profile.isTeacher && !profile.isStudent){
        name = profile.teacherProfile.name;
      }
      else if (!profile.isTeacher && profile.isStudent){
        name = profile.studentProfile.name;
        console.log('name: ',name);
      }
      return <NewHeader
        name = {name}
        {...props}
      />
    }

    const CheckStepper = () => {
      if (this.props.profiles.isEmpty && this.props.location.pathname != '/stepper'){
        console.log('inside stepper');
         this.props.history.push('/stepper');
         return <div></div>;
      }
      else{
        return <div></div>;
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
                <Route path="/home" component={Home}/>
                <Route path="/teacherList" component={() => <TeacherRegs teacherRegs={this.props.teacherRegs.teacherRegs}/>}/>
                <Route path="/studentList" component={() => <StudentRegs studentRegs={this.props.studentRegs.studentRegs}
                isLoading = {this.props.studentRegs.isLoading}/>}/>

              
                <Route path='/findTeacher' component={findTeacher}/>
                <Route path='/findClass' component={() => <FindClass/>}/>
                
            

                <Route path="/newInfo" component={()=><RenderProfile
                  profile={this.props.profiles.profiles}
                  isLoading={this.props.profiles.isLoading}
                  errMess={this.props.profiles.errMess}
                  updateProfile={this.props.updateProfile}
                />}/>

                <Route path='/upload' component={()=><Upload/> }/>

                <PrivateRoute path="/newteacherInfo" component={()=> <StudentInfo 
                      profile={this.props.profiles.profiles}
                      isLoading={this.props.profiles.isLoading}
                      errMess={this.props.profiles.errMess}
                />}/>

                  

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

