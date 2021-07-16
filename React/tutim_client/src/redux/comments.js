import * as ActionTypes from './ActionTypes';

export const Comments = (state= {
        errMess: null,
        isLoading:false,
        comments: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess:null, comments: action.payload}
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, comments:[]}
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, isLoading:false,comments: state.comments.concat(comment)};
        case ActionTypes.LOADING_COMMENTS:
            return {...state, isLoading: true, errMess: null} 
        default:
            return state;
    }
}
