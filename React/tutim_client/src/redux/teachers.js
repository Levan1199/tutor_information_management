import * as ActionTypes from './ActionTypes';
export const Teachers = (state={
        isLoading: true,
        errMess: null,
        teachers: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_TEACHER:
            return {...state, isLoading: false, errMess:null, teachers: action.payload}

        case ActionTypes.TEACHER_LOADING:
            return {...state, isLoading: true, errMess:null, teachers:[]}

        case ActionTypes.TEACHER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, teachers:[]}

        default:
            return state;
    }
}