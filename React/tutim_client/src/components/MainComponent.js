import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './homepage/HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Favorites from './FavoriteComponent';

// import HomePageComponent from './homepage/HomePageComponent';
import TeacherInfo from './teacher/TeacherInfo';
import findTeacher from './forms/findTeacher';
import findClass from './forms/findClass';
import TeacherRegs from './list/teacherRegs';
import StudentRegs from './list/studentRegs';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTeacherReg, fetchStudentReg,
    postFavorite, deleteFavorite, fetchFavorites,
    postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, 
    fetchLeaders, loginUser, logoutUser} from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStatetoProps = state =>{
  return{
    teacherRegs: state.teacherRegs,
    studentRegs: state.studentRegs,
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  }   
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, tel, email, agree, feedback) => dispatch(postFeedback(firstName, lastName, tel, email, agree, feedback)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{
    dispatch(actions.reset('feedback'))
  },
  fetchTeacherReg:()=>{dispatch(fetchTeacherReg())},
  fetchStudentReg: ()=>{dispatch(fetchStudentReg())},

  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  //favorite part
  fetchFavorites: ()=>{dispatch(fetchFavorites())},
  postFavorite: (dishId)=>{dispatch(postFavorite(dishId))},
  deleteFavorite: (dishId)=>{dispatch(deleteFavorite(dishId))},
  //Log in/out
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
})

class Main extends Component{
  
  componentDidMount(){
    this.props.fetchTeacherReg();
    this.props.fetchStudentReg();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render(){
    
    const HomePage = () =>{
      //leader -> leaders
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMess={this.props.promotions.errMess}
        leaders={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = ({match}) =>{
      //dish._id and parseInt error
      // comment.dish_Id -> comment.dish
      return(
        this.props.auth.isAuthenticated
        ?
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish._id===match.params.dishId)[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment)=> comment.dish === match.params.dishId)}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)}
        postFavorite={this.props.postFavorite}
        />
        :
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        favorite={false}
        postFavorite={this.props.postFavorite}
        />
      );
    }

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
                {/* <Route path="/teacherCard" component={TESTING}/> */}

                {/* <Route path="/homepage" component={HomePageComponent}/> */}
                <Route path="/teacherInfo" component={TeacherInfo}/>
                <Route path='/findTeacher' component={findTeacher}/>
                <Route path='/findClass' component={findClass}/>
                {/*  */}
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}/>}/>
                <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
                <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites?this.props.favorites:false} deleteFavorite={this.props.deleteFavorite} />} />
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

