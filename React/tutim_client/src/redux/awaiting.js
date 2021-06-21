import * as ActionTypes from './ActionTypes';
export const Awaiting = (state={
        isLoading: true,
        errMess: null,
        awaiting: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_AWAITING:
            return {...state, isLoading: false, errMess:null, awaiting: action.payload}

        case ActionTypes.AWAITING_LOADING:
            return {...state, isLoading: true, errMess:null, awaiting:[]}

        case ActionTypes.AWAITING_FAILED:
            return {...state, isLoading: false, errMess: action.payload, awaiting:[]}

        default:
            return state;
    }
}