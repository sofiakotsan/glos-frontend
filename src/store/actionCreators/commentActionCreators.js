import { commentActionTypes } from '../actionTypes';

export const setCommentsAC = (comments) => {
    return {
        type: commentActionTypes.SET_COMMENTS,
        payload: {
            comments
        }
    }
}

export const setLoadingAC = () => {
    return {
        type: commentActionTypes.SET_LOADING,
    }
}

export const setErrorsAC = (errors) => {
    return {
        type: commentActionTypes.SET_ERRORS,
        payload: {
            errors
        }
    }
}

export const addCommentAC = (comment) => {
    return {
        type: commentActionTypes.ADD_COMMENT,
        payload: {
            comment
        }
    }
}

export const updateCommentAC = (comment) => {
    return {
        type: commentActionTypes.UPDATE_COMMENT,
        payload: {
            comment
        }
    }
}

export const deleteCommentAC = (id) => {
    return {
        type: commentActionTypes.DELETE_COMMENT,
        payload: {
            id
        }
    }
}