import * as ActionTypes from './ActionTypes';
export const Profiles = (state={
        isLoading: true,
        isEmpty:false,
        errMess: null,
        profiles: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROFILE:
            return {...state, isLoading: false, errMess:null, profiles: action.payload, isEmpty:false}

        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess:null, profiles:[], isEmpty:false}

        case ActionTypes.PROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profiles:[], isEmpty:false}

        case ActionTypes.EMPTY_PROFILE:
            return {...state, isLoading: false, errMess: action.payload, profiles:[], isEmpty: true}

        default:
            return state;
    }
}