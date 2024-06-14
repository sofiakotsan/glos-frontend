import { commentActionTypes } from '../actionTypes';

let initialState = {
    currentComment: null,
    comments: [],
    isLoading: false,
    errors: [],
};

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case commentActionTypes.SET_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments,
                isLoading: false,
                errors: [],
            }
        case commentActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case commentActionTypes.SET_ERRORS:
            return {
                ...state,
                comments: [],
                isLoading: false,
                errors: action.payload.errors,
            }
        case commentActionTypes.ADD_COMMENT:
            console.log(state)
            return {
                ...state,
                comments: [action.payload.comment, ...state.comments],
                isLoading: false,
                errors: [],
            }
        case commentActionTypes.UPDATE_COMMENT:
            return {
                ...state,
                currentComment: null,
                comments: state.comments.map(item => {
                    if(item.id == action.payload.comment.id) {
                        return action.payload.comment;
                    } else {
                        return item;
                    }
                }),
                isLoading: false,
                errors: [],
            }
        case commentActionTypes.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(item => {
                    return item.id != action.payload.id;
                }),
                isLoading: false,
                errors: [],
            }
        default:
            return state; 
    }
}

export default commentReducer;