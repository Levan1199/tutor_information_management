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


import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { signUp ,fetchTeacherProfile ,fetchTeacherReg, fetchStudentReg, postTeacherProfile, postStudentProfile,fetchStudentProfile,
      loginUser, logoutUser, updateTeacherReg} from '../redux/ActionCreators'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import DetailModal from './teacher/DetailModal';

const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
    profiles: state.profiles,
    // comments: state.comments,
    // favorites: state.favorites,
    auth: state.auth
  }   
}

const mapDispatchToProps = dispatch => ({
  // postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  // postFeedback: (firstName, lastName, tel, email, agree, feedback) => dispatch(postFeedback(firstName, lastName, tel, email, agree, feedback)),
  // resetFeedbackForm: ()=>{
  //   dispatch(actions.reset('feedback'))
  // },
  signUp:(creds)=>dispatch(signUp(creds)),
  fetchTeacherProfile: ()=>{dispatch(fetchTeacherProfile())},
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  updateTeacherReg: (props)=>{dispatch(updateTeacherReg(props))},
  fetchStudentReg: ()=>{dispatch(fetchStudentReg())},
  postTeacherProfile: (props)=>{dispatch(postTeacherProfile(props))},

  postStudentProfile: (props)=>{dispatch(postStudentProfile(props))},
  fetchStudentProfile: ()=>{dispatch(fetchStudentProfile())},
  //Log in/out
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
})

class Main extends Component{
    componentDidMount(){
    this.props.fetchTeacherReg();
    this.props.fetchStudentReg();
    this.props.fetchTeacherProfile();
    this.props.fetchStudentProfile();
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

    const RenderProfile = () => {
      return(
        this.props.auth.isAuthenticated
        ?
        <TeacherInfo  profile={this.props.teacherRegs.teacherRegs.filter((teacher)=>teacher.teacherId == this.props.auth.teacherId)[0]}
                      isLoading={this.props.teacherRegs.isLoading}
                      errMess={this.props.teacherRegs.errMess}
        />
        :
        <Redirect to="/home"/>
      );
    }

    return (
      <div>      
        <NewHeader
        name={this.props.profiles.profiles.teacherProfile?this.props.profiles.profiles.teacherProfile.name:false}
        // name={this.props.profiles.profiles.teacherProfile?(this.props.profiles.profiles.teacherProfile?this.props.profiles.profiles.teacherProfile.name:false):(this.props.profiles.profiles.studentProfile?this.props.profiles.profiles.studentProfile.name:false)}
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

                <Route path="/teacherInfo" component={RenderProfile}/>
                <Route path='/findTeacher' component={findTeacher}/>
                <Route path='/findClass' component={() => <FindClass/>}/>
                
                <PrivateRoute path="/newInfo" component={()=>{
                if(this.props.profiles.profiles.teacherProfile){
                  return <NewTeacherInfo 
                        profile={this.props.profiles.profiles}
                        isLoading={this.props.profiles.isLoading}
                        errMess={this.props.profiles.errMess}
                  updateTeacherReg={this.props.updateTeacherReg}
                  />
                }
                else {
                  return <StudentInfo 
                  profile={this.props.profiles.profiles}
                  isLoading={this.props.profiles.isLoading}
                  errMess={this.props.profiles.errMess}
                  />
                }}}/>

                <Route path="/stepper" component={()=>{
                if(this.props.auth.isAuthenticated){
                  return <SetupProfile setupTeacherProfile={this.props.postTeacherProfile} setupStudentProfile={this.props.postStudentProfile}/>
                }
                else {
                  return <Redirect to="/home"/>
                }}}/>

                <PrivateRoute path="/newteacherInfo" component={()=> <StudentInfo 
                      profile={this.props.profiles.profiles}
                      isLoading={this.props.profiles.isLoading}
                      errMess={this.props.profiles.errMess}
                />}/>

                {/* <SetupRoute path="/stepper" component={()=><SetupProfile setupProfile={this.props.postTeacherProfile}/>}/> */}

                {/* <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}/>}/> */}
                {/* <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites?this.props.favorites:false} deleteFavorite={this.props.deleteFavorite} />} /> */}

                <Route path="/detailmodal" component={() => <DetailModal/>}/>
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

