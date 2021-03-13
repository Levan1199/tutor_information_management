import * as ActionTypes from './ActionTypes';
export const TeacherRegs = (state={
        isLoading: true,
        errMess: null,
        teacherRegs: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_TEACHERREG:
            return {...state, isLoading: false, errMess:null, teacherRegs: action.payload}

        case ActionTypes.TEACHERREG_LOADING:
            return {...state, isLoading: true, errMess:null, teacherRegs:[]}

        case ActionTypes.TEACHERREG_FAILED:
            return {...state, isLoading: false, errMess: action.payload, teacherRegs:[]}

        default:
            return state;
    }
}