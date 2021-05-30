import * as ActionTypes from './ActionTypes';
export const CourseInfo = (state={
        isLoading: true,
        errMess: null,
        courseInfo: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_COURSEINFO:
            return {...state, isLoading: false, errMess:null, courseInfo: action.payload}

        case ActionTypes.COURSEINFO_LOADING:
            return {...state, isLoading: true, errMess:null, courseInfo:[]}

        case ActionTypes.COURSEINFO_FAILED:
            return {...state, isLoading: false, errMess: action.payload, courseInfo:[]}

        default:
            return state;
    }
}