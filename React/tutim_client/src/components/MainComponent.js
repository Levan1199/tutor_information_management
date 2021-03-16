import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './homepage/HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

// import HomePageComponent from './homepage/HomePageComponent';
import TeacherInfo from './teacher/TeacherInfo';
import findTeacher from './forms/findTeacher';
import findClass from './forms/findClass';
import TeacherRegs from './list/teacherRegs';
import StudentRegs from './list/studentRegs';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTeacherReg, fetchStudentReg,
      loginUser, logoutUser} from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
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
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  fetchStudentReg: ()=>{dispatch(fetchStudentReg())},

  //Log in/out
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
})

class Main extends Component{
  
  componentDidMount(){
    this.props.fetchTeacherReg();
    this.props.fetchStudentReg();
    // this.props.fetchComments();
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
  

    return (
      <div>      
        <Header
        auth={this.props.auth} 
        loginUser={this.props.loginUser} 
        logoutUser={this.props.logoutUser}  />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/teacherList" component={() => <TeacherRegs teacherRegs={this.props.teacherRegs}/>}/>
                <Route path="/studentList" component={() => <StudentRegs studentRegs={this.props.studentRegs}/>}/>

                <Route path="/teacherInfo" component={TeacherInfo}/>
                <Route path='/findTeacher' component={findTeacher}/>
                <Route path='/findClass' component={findClass}/>
                {/*  */}
                {/* <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}/>}/> */}
                {/* <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites?this.props.favorites:false} deleteFavorite={this.props.deleteFavorite} />} /> */}
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

