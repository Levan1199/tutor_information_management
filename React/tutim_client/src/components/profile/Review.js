import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';


export default function Review(props) {
  const {review, handleBack, handleNext, setupTeacherProfile, setupStudentProfile } = props;
  const {role, name, email} = review;
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Xác nhận thông tin
      </Typography>
      <Grid container row>
          <Grid item xs={12}>
              <Typography gutterBottom variant="h6"><strong>Bạn là: </strong>{role==='isTeacher'?'Gia sư':'Học sinh'} </Typography>
          </Grid>
          <Grid item xs={6}>
              <Typography gutterBottom variant="h6"><strong>Họ và tên: </strong>{name} </Typography>
          </Grid>
          <Grid item xs={6}>
              <Typography gutterBottom variant="h6"><strong>Email: </strong>{email} </Typography>
          </Grid>
      </Grid>
      <Grid container row justify="flex-end">
        <Grid item >
            <Button onClick={() => { handleBack() } }> Quay lại </Button>
        </Grid>
        <Grid item>
        <Button variant="contained" color="primary" 
          onClick={()=> {
            // console.log('ss', setupProfile,' ',typeof(setupProfile));
            if(role==='isTeacher'){
              setupTeacherProfile({name,email,role});
            }
            else if(role==='isStudent'){
              setupStudentProfile({name,email,role});
            }
            return handleNext();
          }}
        >
          Xác nhận
        </Button>
        </Grid>
      </Grid> 
    </React.Fragment>
  );
}