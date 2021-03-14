import * as ActionTypes from './ActionTypes';
export const StudentRegs = (state={
        isLoading: true,
        errMess: null,
        studentRegs: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_STUDENTREG:
            return {...state, isLoading: false, errMess:null, studentRegs: action.payload}

        case ActionTypes.STUDENTREG_LOADING:
            return {...state, isLoading: true, errMess:null, studentRegs:[]}

        case ActionTypes.STUDENTREG_FAILED:
            return {...state, isLoading: false, errMess: action.payload, studentRegs:[]}

        default:
            return state;
    }
}