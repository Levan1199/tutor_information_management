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

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {fetchProfile} from '../redux/ActionCreators'

import CourseDetail from './courseDetail/CourseDetail';
import Courses from './Courses';
import Map from './Map';
import AdminStudentList from './admin/AdminStudentList';
import AdminTeacherList from './admin/AdminTeacherList';
import AdminView from './admin/AdminView';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const mapStatetoProps = state =>{
  return{
    auth: state.auth,
  }   
}

const mapDispatchToProps = dispatch => ({
  fetchProfile:()=>{dispatch(fetchProfile())},
})

class Main extends Component{
  async fetchData(){
    return await this.props.fetchProfile();
  }
  componentDidMount(){    
    this.fetchData();
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
        <ToastContainer position="top-center" autoClose={3000}/>
        <HeaderComponent/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
              
                <Route path="/home" component={()=><Home/>}/>

                <Route exact path="/teacherList" component={() => <TeacherRegs/>}/>                
                <Route path="/teacherList/:subjectName" component={({match}) => <TeacherRegs 
                subjectName={match.params.subjectName}/>}/>
                <Route path="/studentList" component={() => <StudentRegs/>}/>                                       
               
                <Route exact path="/profile/teacher" component={()=><TeacherInfo/>}/>
                <Route exact path="/profile/student" component={()=><StudentInfo />}/>

                <Route path="/profile/student/:profileId" component={({match}) => <ViewStudentInfo profileId={match.params.profileId}/>}/>  
                <Route path="/profile/teacher/:profileId" component={({match}) => <ViewTeacherInfo profileId={match.params.profileId}/>}/>              

                <Route path='/courseDetail/:courseName' component={({match})=><CourseDetail courseName={match.params.courseName}/> }/>               
                <Route path='/courses' component={()=><Courses/>}/> 

                <Route exact path='/map' component={()=><Map/>}/> 
                <Route path='/map/:address' component={({match})=><Map address={match.params.address}/>}/> 

                <PrivateRoute path='/awaiting' component={()=><RegisteredList/>}/> 
                <PrivateRoute path='/teaAwaiting' component={()=><TeaRegisteredList />}/> 

                <PrivateRoute path='/admin/view' component={()=><AdminView/>}/> 
                <PrivateRoute path='/admin/studentList' component={()=><AdminStudentList/>}/> 
                <PrivateRoute path='/admin/teacherList' component={()=><AdminTeacherList/>}/> 

                <Route path="/stepper" component={()=><SetupProfile/>}/>

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