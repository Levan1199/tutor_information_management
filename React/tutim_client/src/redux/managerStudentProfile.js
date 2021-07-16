import * as ActionTypes from './ActionTypes';

export const ManagerStudentProfile = (state = {
        isLoading:true,
        errMess: null,
        managerStudentProfiles: []
    }, action) => {
    switch(action.type){
        case ActionTypes.MANAGERSTUDENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, managerStudentProfiles:[]}
        case ActionTypes.MANAGERSTUDENT_ADD:
            return {...state, isLoading:false, errMess:null,managerStudentProfiles: action.payload};
        case ActionTypes.MANAGERSTUDENT_LOADING:
            return {...state, isLoading: true, errMess:null, managerStudentProfiles:[]}
        default:
            return state;
    }
}
