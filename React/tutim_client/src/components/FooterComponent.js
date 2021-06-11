import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Grid, Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SchoolIcon from '@material-ui/icons/School';
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
const useStyles = makeStyles({
   footer:{
    // position: "fixed",
    margin: "0px auto",
    padding: "20px 0px",
    bottom: "0",
    width: "100%" 
   }
});


const Footer = () => {
    const classes = useStyles();
    return (
        <Box 
        bgcolor="#6fa8bf" className={classes.footer}>
            <Container maxWidth="lg">
                <Grid container spacing={0} justify="center" direction="row">
                    <Grid item xs={6}>
                        <Grid container spacing={0} justify="center" direction="row">
                            <Grid item xs={12}>  
                                <Typography xs={12} variant="subtitle1" align="center" >Link</Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>                       
                                <List component="nav" aria-label="main mailbox folders">
                                    <Link to="/home">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>                            
                                        <ListItemText primary="Home" />
                                    </ListItem>
                                    </Link>

                                    <Link to="/studentList">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <PermIdentityIcon />
                                        </ListItemIcon>
                                        
                                        <ListItemText primary="Student" />
                                    </ListItem>
                                    </Link>
                                </List>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <List component="nav" aria-label="main mailbox folders">
                                    <Link to="/teacherList">
                                        <ListItem button>
                                            <ListItemIcon>
                                                <SchoolIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Teacher" />
                                        </ListItem>
                                    </Link>

                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Drafts" />
                                    </ListItem>
                                </List>
                            </Grid>               
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={0} justify="center" direction="row">
                            <Grid item xs={12}>  
                                <Typography xs={12} variant="subtitle1" align="center" >Address</Typography>
                                <Typography xs={12} variant="body1" align="center" >268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
              
                <Box textAlign="center" paddingTop="20px">
                    Tutur Information Management {new Date().getFullYear()}
                </Box>

            </Container>

        </Box>
    );
}

export default Footer;