import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { Redirect, useHistory } from 'react-router-dom';
import { actionTypes } from 'react-redux-form';
import * as imgToB64 from 'image-to-base64';
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

// fetch Profile


// export const postStudentProfile  = (props) => (dispatch) =>  {
//     console.log('inside post ',props);
//     if (props.role === 'isTeacher'){
//         props.isTeacher = true;
//         props.isStudent = false;
//     }
//     else {
//         props.isTeacher = false;
//         props.isStudent = true;
//     }
//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'studentProfile', {
//         method: 'POST',
//         body: JSON.stringify(props),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         },
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if(response.ok){
//                 return response;
//             }
//             else{
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         .then(dispatch(fetchStudentProfile()))
//         .catch(error => {console.log('Post teacher registrations ', error.message);
//             alert('Your registrations could not be posted\nError: ' + error.message);});
// }





// export const postTeacherProfile = (props) => (dispatch) =>  {
//     console.log('inside post ',props);
//     if (props.role === 'isTeacher'){
//         props.isTeacher = true;
//         props.isStudent = false;
//     }
//     else {
//         props.isTeacher = false;
//         props.isStudent = true;
//     }
//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'teacherProfile', {
//         method: 'POST',
//         body: JSON.stringify(props),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         },
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if(response.ok){
//                 return response;
//             }
//             else{
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         // .then(response => response.json())
//         .then(dispatch(fetchTeacherProfile()))
//         // .then(response => dispatch(addProfile(response)))
//         .catch(error => {console.log('Post teacher registrations ', error.message);
//             alert('Your registrations could not be posted\nError: ' + error.message);});
// }
////////////////////////
export const fetchProfile = () => (dispatch) => {
    console.log('inside fetching');
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
            console.log('fetched profile ',response.status);
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
        console.log('profiles: ',profile);
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
        // .then(response => response.json())
        .then(dispatch(fetchProfile()))
        // .then(response => dispatch(addProfile(response)))
        .catch(error => {console.log('Post profile ', error.message);
            alert('Your registrations could not be posted\nError: ' + error.message);});
}

export const updateProfile = (props) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    var formdata = new FormData();
    for ( var key in props ) {
        formdata.append(key, props[key]);
    }
    console.log('formdata ',formdata.getAll('avatar','name','email','description'));
    
    return fetch(baseUrl + 'profile',
    {
        method: 'PUT',
       
        headers: {
            // 'Content-Type': 'multipart/form-data; boundary=----aaa----',
            // 'Accept-Encoding': 'multipart/form-data',
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
        .then(response => dispatch(addProfile(response)))
        .catch(error => {console.log('Update profile ', error.message);
            alert('Your profile could not be updated\nError: ' + error.message);});
}
//////////////////////////
// export const uploadFile = (props) => (dispatch) => {
//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'imageUpload'  ,{
//         method: 'PUT',
//         body: JSON.stringify(props),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         },
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if(response.ok){
//                 return response;
//             }
//             else{
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         .then(response => response.json())
//         .then(response => dispatch(addProfile(response)))
//         .catch(error => {console.log('Update profile ', error.message);
//             alert('Your profile could not be updated\nError: ' + error.message);});
// }


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

// export const updateTeacherReg = (props) => (dispatch) => {
//     const bearer = 'Bearer ' + localStorage.getItem('token');
//     // const teacherId = localStorage.getItem('teacherId');
//     // console.log(props);

//     return fetch(baseUrl + 'teacherProfile/'  ,{
//         method: 'PUT',
//         body: JSON.stringify(props),
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': bearer
//         },
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if(response.ok){
//                 return response;
//             }
//             else{
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//         })
//         .then(response => response.json())
//         .then(response => dispatch(addProfile(response)))
//         .catch(error => {console.log('Update teacher registrations ', error.message);
//             alert('Your registrations could not be updated\nError: ' + error.message);});
// }



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