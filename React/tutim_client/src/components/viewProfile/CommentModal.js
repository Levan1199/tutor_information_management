
import React, { useState } from 'react'
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from '@material-ui/icons/Star';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    paperStyle:{
        padding :20,
        width:"60%", 
        margin:"20px auto",
    },
    icon:{
        backgroundColor: theme.palette.primary.main
    },
    btn:{
        marginTop: '15px',
        backgroundColor: theme.palette.secondary.light,
        variant:'contained'
    },
    inputBar:{
        marginTop:0,
        marginBottom:'10px'
    },
    label:{
        fontWeight: 'medium',
        color: theme.palette.primary.dark
    },
    upload:{
        height:'100%',
        widht:'100%',
        backgroundColor:'#FF0000'
    },
    star:{
        width: "25px",
        height:"25px"
    }

}));





const CommentModal = (props)=>{
    const classes = useStyles();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");

    
    const handleSubmit = ()=>{   
      
        if(rating === null || comment === ""){
            toast.error("You need to rate and comment");      
        }
        else
        {
            props.postComment(props.id, rating, comment);
            return props.closeModal();
        }
    }



    const StarRating = () => {      
        return (
            <>
                {[...Array(5)].map((star, i)=>{
                    const ratingValue = i+1;
                    return (
                        <>
                        <label>
                            <input 
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={()=>setRating(ratingValue)}
                                style={{display:"none"}}
                            />
                            <StarIcon className={classes.star}
                            onMouseEnter={()=>setHover(ratingValue)}
                            onMouseLeave={()=>setHover(null)}
                            style={{fill: ratingValue <= (hover || rating) ? "#ffc107":"#e4e5e9"}}
                            />
                        </label>                        
                        </>
                    )
                })}             
            </>
        );
    }
   
    return(
        <Paper elevation={10} className={classes.paperStyle}>               
            <Typography variant="h5" color="primary">Your comment</Typography>
            <Grid container direction="row" spacing={1} justify="center">                  
                <Grid container sm={12} justify="center">
                    <StarRating/>                            
                </Grid>
                <Grid sm={12} container justify="center">
                    <Typography variant="body2">The rating is {rating}/5</Typography>                     
                </Grid>
                
                <Grid item sm={12}>
                    <TextField className={classes.inputBar} 
                    required
                    error = {comment === "" ? true : false}
                    // helperText="Required"
                    name="comment"
                    placeholder="Comment is required"
                    variant="outlined"
                    fullWidth                     
                    onChange = {(evt)=>setComment(evt.target.value)}
                    multiline
                    rows={5}
                    rowsMax={5}
                    />
                </Grid>
            </Grid>
                    
                    <Grid container direction="row"  justify="space-evenly">
                        <Grid md={4} item>
                            <Button className={classes.btn} type="submit" fullWidth onClick={handleSubmit}> Submit</Button>
                        </Grid>
                        <Grid md={4} item>
                            <Button className={classes.btn} onClick={props.closeModal} fullWidth>Cancel</Button>
                        </Grid>
                    </Grid>               
        </Paper>           
    );
}

export default CommentModal