import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (userId, rating, comment) => (dispatch) =>  {
    const newComment = {
        user: userId,
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
        // credentials: 'same-origin'
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
        .catch(error => {console.log('Post comments ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);});
}


export const fetchComments = () => (dispatch) => {
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

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})




export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) =>  {
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        // credentials: 'same-origin'
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
        .then(response => alert('Thank you for your feedback!\n'+JSON.stringify(response)))
        .catch(error => {console.log('Post Feedback ', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);});
}
////////////////////// register 
export const studentRegTeacher = (teacherId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'studentReg/add/' + teacherId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if(response.status === 200){
            console.log('sRegt ',response);
            return response;
        }
        else{
            // console.log('fetch failedd');
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
    .then(profile => {
        return dispatch(addProfile(profile));
    })
    .catch(error => dispatch(profileFailed(error.message)));
}

export const teacherRegStudent = (studentId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'teacherReg/add/' + studentId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else{
            // console.log('fetch failedd');
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
    .then(profile => {
        return dispatch(addProfile(profile));
    })
    .catch(error => dispatch(profileFailed(error.message)));
}
// profile
// export const fetchProfileInfo = () => (dispatch) => {
//     dispatch(profileLoading(true));
//     const bearer = 'Bearer ' + localStorage.getItem('token');
//     return fetch(baseUrl + 'profile', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         }
//     })
//     .then(response => {
//         if(response.status === 200){
//             return response;
//         }
//         else if (response.status === 204){
//             console.log('inside empty');
//             dispatch(emptyProfile());
//             console.log('inside empty 2');
//             return response;
//         }
//         else{
//             console.log('fetch failedd');
//             var error = new Error('Error ' + response.status + ': ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//     },
//     error => {
//         var errmess = new Error(error.message);
//         throw errmess;
//     })
//     .then(response => response.json())
//     .then(profile => {
//         return dispatch(addProfile(profile));
//     })
//     .catch(error => dispatch(profileFailed(error.message)));
// }

export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'profile', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        }
    })
    .then(response => {
        if(response.status === 200){
            return response;
        }
        else if (response.status === 204){
            console.log('inside empty');
            dispatch(emptyProfile());
            console.log('inside empty 2');
            return response;
        }
        else{
            console.log('fetch failedd');
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
    .then(profile => {
        return dispatch(addProfile(profile));
    })
    .catch(error => dispatch(profileFailed(error.message)));
}


export const postProfile = (props) => (dispatch) =>  {
    console.log('inside post profile ',props);
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
        .catch(error => {console.log('Post profile ', error.message);
            alert('Your registrations could not be posted\nError: ' + error.message);});
}

export const updateProfile = (props) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var formdata = new FormData();
    for ( var key in props ) {
        if (key=='avatar'){
            formdata.append(key, props[key]);
            continue;
        }
        formdata.append(key, JSON.stringify(props[key]));
        for(var val of formdata.values() )
        console.log('form', val);
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
            dispatch(addProfile(response));
        })
        .catch(error => {console.log('Update profile ', error.message);
            alert('Your profile could not be updated\nError: ' + error.message);});
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
    console.log('in signup');
    return fetch(baseUrl + 'users/signup',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then((response)=>{
        console.log('res ',response);

        if(response.ok){
            dispatch(loginUser(creds));
            return response;
        }
        else{
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
        // teacherId: response.teacherId
    }
}

export const loginError = (message) => {
    return{
        type: ActionTypes.LOGIN_FAILURE,
        message
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
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
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
            console.log('login success fetching');
            // if(response.isTeacher){
            //     dispatch(fetchTeacherProfile());
            // }
            // else if(response.isStudent){
            //     dispatch(fetchStudentProfile());
            // }
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
    // localStorage.removeItem('teacherId');
    dispatch(receiveLogout());
}




export const fetchTeacherReg = () => (dispatch) => {
    dispatch(teacherRegLoading(true));

    return fetch(baseUrl + 'teacherReg')
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
    console.log('inside fetch stu');
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
    console.log('inside fetch course');
    return fetch(baseUrl + 'course')
        .then(response => response.json())
        .then(course => dispatch(addCourseInfo(course)));
}