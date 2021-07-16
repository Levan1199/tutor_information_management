import * as ActionTypes from './ActionTypes';

export const ManagerProfile = (state = {
        isLoading:true,
        errMess: null,
        managerProfiles: []
    }, action) => {
    switch(action.type){
        case ActionTypes.MANAGERPROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, managerProfiles:[]}
        case ActionTypes.MANAGERPROFILE_ADD:
            return {...state, isLoading:false, errMess:null,managerProfiles: action.payload};
        case ActionTypes.MANAGERPROFILE_LOADING:
            return {...state, isLoading: true, errMess:null, managerProfiles:[]}
        default:
            return state;
    }
}
