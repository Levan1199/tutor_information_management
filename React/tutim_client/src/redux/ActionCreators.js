import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { toast } from 'react-toastify';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const loadComment = () => ({
    type: ActionTypes.LOADING_COMMENTS
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});


export const postComment = (commentTo, rating, comment) => (dispatch) =>  {
    const newComment = {
        commentTo: commentTo,
        rating: rating,
        comment: comment
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            toast.error("Your comment could not be posted");           
        });
}


export const fetchComments = () => (dispatch) => {
    dispatch(loadComment());
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

//////

export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'profile', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },  
        credentials: 'same-origin'  
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else if (response.status === 204){
            dispatch(emptyProfile());
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(profile =>{ 
        if(profile.isDisable){
            toast.error("Your account is disabled");
        }
        else{
            dispatch(addProfile(profile))
        }
    })
    .catch(error => dispatch(profileFailed(error.message)));
}


export const postProfile = (props) => (dispatch) =>  {
    if (props.role === 'isTeacher'){
        props.isTeacher = true;
        props.isStudent = false;
    }
    else {
        props.isTeacher = false;
        props.isStudent = true;
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'profile', {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(dispatch(fetchProfile()))
        .catch(error => {
            toast.error("Your registrations could not be posted");
        });
}

export const updateProfile = (props) => (dispatch) => {
    dispatch(profileLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var formdata = new FormData();
    for ( var key in props ) {
        if (key==='avatar'){
            formdata.append(key, props[key]);
            continue;
        }
        formdata.append(key, JSON.stringify(props[key]));
    }
    return fetch(baseUrl + 'profile',
    {
        method: 'PUT',       
        headers: {
            'Authorization': bearer
        },
        body: formdata,
        credentials: 'same-origin'
    })
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response =>{
            return dispatch(addProfile(response));
        })
        .catch(error => {
            toast.error("Your profile could not be updated");
        });
}

export const emptyProfile = () => ({
    type: ActionTypes.EMPTY_PROFILE
})

export const addProfile = (profile)=> ({
    type: ActionTypes.ADD_PROFILE,
    payload: profile
});

export const profileFailed = (errmess)=>({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
})

export const profileLoading = () =>({
    type: ActionTypes.PROFILE_LOADING
})

//signup
export const signUp = (creds) => (dispatch) => {
    return fetch(baseUrl + 'users/signup',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },        
        credentials: 'same-origin', 
        body: JSON.stringify(creds)
    })
    .then((response)=>{
        if(response.ok){
            dispatch(loginUser(creds));
            return response;
        }
        else{
            toast.error("Username already used");
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        throw error;
    })
   
    .catch((error) => dispatch(loginError(error.message)));
}

// User Authentication
// Login
export const requestLogin = (creds) => {
    return{
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return{
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
    }
}

export const loginError = (message) => {
    return{
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}
export const logoutEmptyProfile = () => {
    return{
        type: ActionTypes.LOGOUT_PROFILE
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return fetch(baseUrl + 'users/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then((response)=>{
        if(response.ok){
            toast.success("Login successfully!"); 
            return response;
        }
        else if(response.status === 401){
            toast.error("Wrong password or username!");        
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        else{
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>response.json())
    .then((response)=>{
        if(response.success){
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            dispatch(fetchProfile());
            dispatch(receiveLogin(response));
        }
        else{
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch((error) => dispatch(loginError(error.message)));
}

//Login with facebook

export const loginWithFacebook = (accessToken) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    const bearer = 'Bearer ' + accessToken;

    return fetch(baseUrl + 'users/facebook/token',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': bearer
        },       
    })
    .then((response)=>{
        if(response.ok){
            toast.success("Login successfully!"); 
            return response;
        }
        else{
            toast.error("Wrong password or username");
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        throw error;
    })
    .then((response)=>response.json())
    .then((response)=>{
        localStorage.setItem('token', response.token);        
        dispatch(fetchProfile());
        dispatch(receiveLogin(response));
    })
    .catch((error) => dispatch(loginError(error.message)));
}

//Logout

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(logoutEmptyProfile());
    dispatch(receiveLogout());
}




export const fetchTeacherReg = () => (dispatch) => {
    dispatch(teacherRegLoading(true));
    return fetch(baseUrl + 'teacherReg',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'  
    })
        .then(response => response.json())
        .then(teacherReg => dispatch(addTeacherReg(teacherReg)));
}

export const addTeacherReg = (teacherReg)=> ({
    type: ActionTypes.ADD_TEACHERREG,
    payload: teacherReg
});

export const teacherRegFailed = (errmess)=>({
    type: ActionTypes.TEACHERREG_FAILED,
    payload: errmess
})

export const teacherRegLoading = () =>({
    type: ActionTypes.TEACHERREG_LOADING
})
//////////////////////////////
export const fetchStudentReg = () => (dispatch) => {
    dispatch(studentRegLoading(true));

    return fetch(baseUrl + 'studentReg')
        .then(response => response.json())
        .then(studentReg => dispatch(addStudentReg(studentReg)));
}

export const addStudentReg = (studentReg)=> ({
    type: ActionTypes.ADD_STUDENTREG,
    payload: studentReg
});

export const studentRegFailed = (errmess)=>({
    type: ActionTypes.STUDENTREG_FAILED,
    payload: errmess
})

export const studentRegLoading = () =>({
    type: ActionTypes.STUDENTREG_LOADING
})


///Course Action
export const addCourseInfo = (course)=> ({
    type: ActionTypes.ADD_COURSEINFO,
    payload: course
});

export const courseInfoFailed = (errmess)=>({
    type: ActionTypes.COURSEINFO_FAILED,
    payload: errmess
})

export const courseInfoLoading = () =>({
    type: ActionTypes.COURSEINFO_LOADING
})

export const fetchCourseInfo = () => (dispatch) => {
    dispatch(courseInfoLoading());
    return fetch(baseUrl + 'course')
        .then(response => response.json())
        .then(course => dispatch(addCourseInfo(course)));
}

export const fetchCourseDetail = (name) => (dispatch) => {
    dispatch(courseInfoLoading());
    return fetch(baseUrl + 'course/'+ name,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'          
        },  
        credentials: 'same-origin'  
    })
        .then(response => response.json())
        .then(course => dispatch(addOneCourse(course)));
}

export const deleteCourseDetail = (name) => (dispatch) => {
    dispatch(courseInfoLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'course/'+ name,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': bearer      
        },  
        credentials: 'same-origin'  
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })      
    .then(dispatch(fetchCourseInfo()))
    .catch(error => dispatch(courseInfoFailed(error.message)));
}


export const updateCourse = (course) => (dispatch) => {
    dispatch(courseInfoLoading());
    const courseName = course.prevName;
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var formdata = new FormData();
    for ( var key in course ) {
        if (key==='courseImg'){
            formdata.append(key, course[key]);
            continue;
        }
        formdata.append(key, JSON.stringify(course[key]));
    }
    return fetch(baseUrl + 'course/'+ courseName,{
        method: 'PUT',  
        headers:{
            'Authorization': bearer      
        },  
        body:formdata,
        credentials: 'same-origin'  
    })
    .then(response => response.json())
    .then(course => dispatch(addCourseInfo(course)));
}


export const postCourse = (course) => (dispatch) => {
    dispatch(courseInfoLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var formdata = new FormData();
    for ( var key in course ) {
        if (key==='courseImg'){
            formdata.append(key, course[key]);
            continue;
        }
        formdata.append(key, JSON.stringify(course[key]));
    }
    return fetch(baseUrl + 'course/',{
        method: 'POST',  
        headers:{
            'Authorization': bearer      
        },  
        body:formdata,
        credentials: 'same-origin'  
    })
    .then(response => response.json())
    .then(course => dispatch(addCourseInfo(course)));
}


export const addOneCourse = (course)=> ({
    type: ActionTypes.ADD_ONECOURSE,
    payload: course
});


////////////////////// Connection
export const addAwaiting = (awaiting)=> ({
    type: ActionTypes.ADD_AWAITING,
    payload: awaiting
});

export const awaitingFailed = (errmess)=>({
    type: ActionTypes.AWAITING_FAILED,
    payload: errmess
})

export const awaitingLoading = () =>({
    type: ActionTypes.AWAITING_LOADING
})

///////hold on
export const studentAwait = (connecting) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/student', {
        method: 'POST',
        body: JSON.stringify(connecting),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchStudentAwait()))   
    .catch(error => dispatch(awaitingFailed(error.message)));
}

export const removeStudentAwait = (connecting) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/student', {
        method: 'DELETE',
        body: JSON.stringify(connecting),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            toast.success("Disconnect successfully");
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchStudentAwait()))   
    .catch(error => dispatch(awaitingFailed(error.message)));
}

export const fetchStudentAwait = () => (dispatch) => {
    dispatch(awaitingLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/student', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        return response.json()})
    .then(awaiting => {
        return dispatch(addAwaiting(awaiting));
    })
    .catch(error => dispatch(awaitingFailed(error.message)));
}

///////teacher
export const teacherAwait = (connecting) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/teacher', {
        method: 'POST',
        body: JSON.stringify(connecting),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchTeacherAwait()))   
    .catch(error => dispatch(awaitingFailed(error.message)));
}

export const fetchTeacherAwait = () => (dispatch) => {
    dispatch(awaitingLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/teacher', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        return response.json()})
    .then(awaiting => {
        return dispatch(addAwaiting(awaiting));
    })
    .catch(error => dispatch(awaitingFailed(error.message)));
}

export const removeTeacherAwait = (connecting) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'awaiting/teacher', {
        method: 'DELETE',
        body: JSON.stringify(connecting),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            toast.success("Disconnected successfully");
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchTeacherAwait()))   
    .catch(error => dispatch(awaitingFailed(error.message)));
}
///////////

export const addManagerProfile = (profiles)=> ({
    type: ActionTypes.MANAGERPROFILE_ADD,
    payload: profiles
});

export const failedManagerProfile = (errmess)=>({
    type: ActionTypes.MANAGERPROFILE_FAILED,
    payload: errmess
})

export const loadingManagerProfile = () =>({
    type: ActionTypes.MANAGERPROFILE_LOADING
})

export const disableTeacherAcc = (userId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'admin/teacher/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            toast.success("success");
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchTeacherAcc()))
    .catch(error => dispatch(failedManagerProfile(error.message)));
}



export const fetchTeacherAcc = () => (dispatch) => {
    dispatch(loadingManagerProfile());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'admin/teacher', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(response => response.json())
    .then(response => dispatch(addManagerProfile(response)))   
    .catch(error => dispatch(failedManagerProfile(error.message)));
}
//////////////////

///////hold on
export const addManagerStudent = (profiles)=> ({
    type: ActionTypes.MANAGERSTUDENT_ADD,
    payload: profiles
});

export const failedManagerStudent = (errmess)=>({
    type: ActionTypes.MANAGERSTUDENT_FAILED,
    payload: errmess
})

export const loadingManagerStudent = () =>({
    type: ActionTypes.MANAGERSTUDENT_LOADING
})

export const fetchStudentAcc = () => (dispatch) => {
    dispatch(loadingManagerStudent());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'admin/student', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(response => response.json())
    .then(response => dispatch(addManagerStudent(response)))   
    .catch(error => dispatch(failedManagerStudent(error.message)));
}

export const disableStudentAcc = (userId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'admin/student/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.status === 200){
            toast.success("success");
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    })   
    .then(dispatch(fetchStudentAcc()))   
    .catch(error => dispatch(failedManagerStudent(error.message)));
}