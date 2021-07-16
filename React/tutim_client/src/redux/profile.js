import * as ActionTypes from './ActionTypes';
export const Profiles = (state={
        isLoading: true,
        isEmpty:false,
        errMess: null,
        profiles: null
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROFILE:
            return {...state, isLoading: false, errMess:null, profiles: action.payload, isEmpty:false}

        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess:null, profiles:null, isEmpty:false}

        case ActionTypes.PROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profiles:null, isEmpty:false}

        case ActionTypes.EMPTY_PROFILE:
            return {...state, isLoading: false, errMess: null, profiles:null, isEmpty: true}
        case ActionTypes.LOGOUT_PROFILE:
            return {...state, isLoading: false, errMess: null, profiles:null, isEmpty: false} 

        default:
            return state;
    }
}