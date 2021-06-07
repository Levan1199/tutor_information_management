import React, {useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Avatar, Modal, FormControl, InputLabel, Input, FormHelperText, Grid, Typography } from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';

import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import {avatarUrl} from '../../shared/baseUrl';
// import Login from './login';
import SignIn from '../entrance/signIn';
import SignUp from '../entrance/signUp';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom:'65px'
  },
  menuButton: {
    color: theme.palette.primary.dark,
    backgroundColor:'transparent'
  },
  title: {
    justifyContent:"space-between"
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
  },
  navButton:{
    '&:hover': {
      backgroundColor: 'theme.palette.primary.dark',
      textDecoration: 'none',
    },
    color: '#000000',
  },
  menuPaper: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.light
    }
  },
  customWidth: {
    '& li': {
        width: '300px',
    }
  },
  username:{
    color: "#000000",
    fontWeight: 'bold',
    fontFamily:"Roboto",
    marginRight: '15px'
  }
}));

const NewHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [openModal, setOpenModal] = React.useState(false);
  const [modalSignUp, setModalSU] = React.useState(false);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    props.logoutUser();
    return history.push('/home');
  }

  const switchModal = () => {
    if (openModal){
      setModalSU(true);
      return setOpenModal(false);
    }
    else{
      setOpenModal(true);
      return setModalSU(false);
    }
  }

  const body = (
    <Grid>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl>
    </Grid>
  );

  const navRoute =[
    {
      link: '/home',
      nameLink: 'Home',
      icon: <HomeIcon/>
    },
    {
      link: '/studentList',
      nameLink: 'Student',
      icon: <PermIdentityIcon/>
    },
    {
      link: '/teacherList',
      nameLink: 'Teacher',
      icon: <SchoolIcon/>
    },
    {
      link: '/home',
      nameLink: 'Courses',
      icon: <SchoolIcon/>
    }
  ]

  return (
    <div className={classes.root}>       
      <AppBar position="fixed" >
        <Toolbar className={classes.title}>
          {/* <Avatar alt="logo" src="/assets/images/download.png" variant="square" /> */}
        {isMobile ? 
         (
            <>
            <IconButton className={classes.menuButton} aria-label="menu" onClick={handleMenu} >
              <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} getContentAnchorEl={null} anchorOrigin={{vertical: "bottom", horizontal: "center"}} keepMounted transformOrigin={{vertical: "top", horizontal: "center" }} open={open} onClose={() => setAnchorEl(null)} className={classes.menuPaper}>
              {
                navRoute.map(item => {
                  const {link, nameLink} = item;
                  return (
                    <Link to={link} className={classes.navButton, classes.customWidth}>
                      <MenuItem fontWeight='bold'>
                        {nameLink}
                      </MenuItem>
                    </Link>     
                  );
                })
              }
              {
              !props.auth.isAuthenticated ?
              <MenuItem onClick={()=>setOpenModal(true)} >
                Sign In
                {props.auth.isFetching ?
                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    : null
                }
              </MenuItem>
              :
              <>
              <Link to="/newInfo">
                <MenuItem>
                  <Typography variant="body1">
                    Your Profile
                  </Typography>
                </MenuItem>
              </Link>    

              <MenuItem onClick={handleLogout}>          
                  Sign Out
                    {props.auth.isFetching ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
              </MenuItem>
              </>
            }
            </Menu>
            </>
          ) : (
            <>
              <div className={classes.headerOptions}>
                {
                  navRoute.map(item => {
                    const {link, nameLink, icon} = item;
                    return (
                      <Link to={link} className={classes.navButton}>
                        <Button variant="text" >
                          {icon} {nameLink}
                        </Button>
                      </Link>     
                    );
                  })
                }                 
              </div>
              {
                !props.auth.isAuthenticated ?
                <Button variant="contained" onClick={()=>setOpenModal(true)} color="secondary" className={classes.navButton}>
                Sign In
                {props.auth.isFetching ?
                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    : null
                }
                </Button>
                :
                <>
                <Link to="/newInfo">
                  <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item><Avatar alt="avatar" src= {avatarUrl+props.imgPath} /></Grid>
                    <Grid item>
                      <Typography variant="h6" className={classes.username}>
                      {props.name?props.name:null}
                      </Typography>
                    </Grid>                
                  </Grid>
                </Link>              
                <Button onClick={handleLogout} variant="contained" color="secondary" >
                    Sign Out
                    {props.auth.isFetching ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
                </Button>
                </>
              }
            </>
          )}          
             
        </Toolbar>
      </AppBar>
      <Modal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SignIn loginUser={props.loginUser} setOpenModal={()=>setOpenModal()} switchModal={switchModal}
        loginWithFacebook={props.loginWithFacebook}/>              
      </Modal>

      <Modal
        open={modalSignUp}
        onClose={()=>{setModalSU(false)}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <SignUp signUp={props.signUp} setModalSU={()=>setModalSU()} switchModal={switchModal}/>              
      </Modal>

    </div>
  );
};

export default NewHeader;

