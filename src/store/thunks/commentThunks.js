import CommentService from '../../services/CommentService';
import { addCommentAC, deleteCommentAC, setCommentsAC, setLoadingAC, updateCommentAC } from '../actionCreators/commentActionCreators';

export const loadFileComments = (id) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const comments = await CommentService.getFileComments(username, id);

    if(comments) {
        dispatch(setCommentsAC(comments));
    } else {
        dispatch(setCommentsAC([]));
    }
}

export const loadRepositoryComments = (id) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const comments = await CommentService.getRepositoryComments(username, id);

    if(comments) {
        dispatch(setCommentsAC(comments));
    } else {
        dispatch(setCommentsAC([]));
    }
}

export const addFileComment = (commentText, id) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const comment = {
        "author": username,
        "text": commentText,
        "date": new Date().toISOString()
    };

    const newComment = await CommentService.addFileComment(username, id, comment);

    if(newComment) {
        dispatch(addCommentAC(newComment));
    }
}

export const addRepositoryComment = (commentText, id) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const comment = {
        "author": username,
        "text": commentText,
        "date": new Date().toISOString()
    };
    
    const newComment = await CommentService.addRepositoryComment(username, id, comment);

    if(newComment) {
        dispatch(addCommentAC(newComment));
    }
}

export const updateComment = (comment) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const newComment = await CommentService.updateComment(username, comment);

    if(newComment) {
        dispatch(updateCommentAC(newComment));
    }
}

export const deleteComment = (id) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const response = await CommentService.deleteComment(id);

    if(response.status == 200) {
        dispatch(deleteCommentAC(id));
    }
}