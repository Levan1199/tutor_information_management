import React from "react";
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
import {Link} from 'react-router-dom';

import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import Login from './login';

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
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.secondary.light,
    fontWeight: 'bold',
    marginRight: '15px'
  }
}));

const NewHeader = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  console.log('sth',props);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    props.logoutUser();
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
      nameLink: 'Trang chu',
      icon: <HomeIcon/>
    },
    {
      link: '/studentList',
      nameLink: 'Phu Huynh',
      icon: <PermIdentityIcon/>
    },
    {
      link: '/teacherList',
      nameLink: 'Gia Su',
      icon: <SchoolIcon/>
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar className={classes.title}>
          <Avatar alt="logo" src="/assets/images/download.png" variant="square" />
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
              <MenuItem onClick={handleOpen} >
                {/* <Button variant="text" onClick={handleOpen} className={classes.navButton}> */}
                Dang Nhap
                {props.auth.isFetching ?
                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    : null
                }
                {/* </Button> */}
              </MenuItem>
              :
              <>
              <MenuItem>
                <Link to="teacherInfo">
                <Typography variant="body1">
                  Trang Ca Nhan
                </Typography>
                </Link>    
              </MenuItem>
              <MenuItem onClick={handleLogout}>          
                {/* <Button onClick={handleLogout}> */}
                    Dang Xuat
                    {props.auth.isFetching ?
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        : null
                    }
                {/* </Button> */}
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
                <Button variant="contained" onClick={handleOpen} color="secondary" className={classes.navButton}>
                Dang Nhap
                {props.auth.isFetching ?
                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    : null
                }
                </Button>
                :
                <>
                <Link to="newteacherInfo">
                <Typography variant="h6" className={classes.username}>
                  {props.name?props.name.toUpperCase():null}
                </Typography>
                </Link>              
                <Button onClick={handleLogout} variant="contained" color="secondary" >
                    Dang Xuat
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
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Login loginUser={props.loginUser} closeModal={handleClose}/>              
      </Modal>
    </div>
  );
};

export default NewHeader;

