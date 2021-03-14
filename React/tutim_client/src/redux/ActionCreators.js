import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { actionTypes } from 'react-redux-form';
import { NavbarText } from 'reactstrap';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, comment) => (dispatch) =>  {
    const newComment = {
        dish: dishId,
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

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                console.log('what happened');
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
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

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


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
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
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

// Task 1 - Fetch Leaders
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
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
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

// Task 2 - Post Feedback

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

// Favorite feature
export const addFavorites = (favorites)=> ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

export const favoritesFailed = (errmess)=>({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
})

export const favoritesLoading = () =>({
    type: ActionTypes.FAVORITES_LOADING
})

export const fetchFavorites = () =>(dispatch)=>{
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites',{
        headers: {
            'Authorization': bearer
        },
    })
    .then(response =>{
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}


export const postFavorite = (dishId) => (dispatch) => {
    //syntax error 'Bearer' -> 'Bearer '
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites/' + dishId,{
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        // credentials: 'same-origin'
    })
    .then((response)=>{
        if(response.ok){
            return response
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },(error)=>{
        throw error
    })
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Added', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'favorites/' + dishId, {
        method: 'DELETE',
        headers:{
            'Authorization': bearer
        },
        // credentials: 'same-origin'
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
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Deleted', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch((error)=> dispatch(favoritesFailed(error.message)));
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
        token: response.token
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
    dispatch(requestLogin(creds))

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
            dispatch(fetchFavorites());
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
    dispatch(favoritesFailed('Error 401: Unauthorized'));
    dispatch(receiveLogout());
}

// export const fetchTeachers = () => (dispatch) => {
//     return fetch(baseUrl + 'teachers')
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
//         // .then(comments => dispatch(addComments(comments)))
//         // .catch(error => dispatch(commentsFailed(error.message)));
// }




// export const fetchTeacher = () => (dispatch) => {
//     dispatch(teacherLoading(true));

//     return fetch(baseUrl + 'teachers')
//         .then(response => {
//             if(response.ok){
//                 console.log(response.json());
//                 return response;
//             }
//             else{
//                 console.log('what happened');
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
//         .then(teachers => dispatch(addTeacher(teachers)))
//         .catch(error => dispatch(teacherFailed(error.message)));
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