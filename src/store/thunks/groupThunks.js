import GroupService from '../../services/GroupService';
import UserService from '../../services/UserService';
import { addNewAC, setErrorsAC, setLoadingAC, setCurrentGroupAC, deleteGroupAC, setGroupsAC, addUserAC, removeUserAC } from '../actionCreators/groupActionCreators';

export const addNewGroup = (name, group) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    
    let foundGroup;
    try {
        foundGroup = await GroupService.getGroup(username, name, false);
    } catch (e) {

    }

    if(foundGroup) {
        dispatch(setErrorsAC(['A group with this name already exists.']));
    } else {
        const data = await GroupService.putGroup(username, name, group);

        if(data?.name) {
            dispatch(addNewAC(data));
            dispatch(setErrorsAC([]));
        } else {
            dispatch(setErrorsAC(['There has been an error.']));
        }
    }

    
}

export const setCurrentGroup = (groupId) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const group = await GroupService.getGroup(username, groupId);

    console.log(group)

    if(group?.name) {
        dispatch(setCurrentGroupAC(group));
    } else {
        dispatch(setCurrentGroupAC(null));
    }
}

export const setGroupAccess = (name, accessType) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const group = await GroupService.getGroup(username, name);
    group.accessType = accessType;
    const response = await GroupService.putGroup(username, name, group);
    
    if(response.status == 200) {
        dispatch(setCurrentGroupAC(group));
        setErrorsAC([]);
    } else {
        setErrorsAC(['There has been an error.']);
    }
}

export const deleteGroup = (name) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const response = await GroupService.deleteGroup(username, name);

    if(response.status == 200 || response.status == 204) {
        dispatch(deleteGroupAC(name));
        dispatch(setErrorsAC([]));
        // todo: set success msg
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}

export const loadGroups = () => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const groups = await GroupService.getUserGroups(username);

    if(groups?.content?.length) {
        dispatch(setGroupsAC(groups?.content));
    } else {
        dispatch(setGroupsAC([]))
    }
}

export const addUserToGroup = (name, usernameToAdd) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const userToAdd = await UserService.getUser(usernameToAdd);

    if(usernameToAdd == username) {
        dispatch(setErrorsAC(['You cannot add yourself to your own group.'])); 
        return;
    }
    
    if(userToAdd?.username) {
        const response = await GroupService.addUserToGroup(username, name, usernameToAdd);

        if(response.status = 200) {
            dispatch(addUserAC(userToAdd));
            dispatch(setErrorsAC([]));
            // todo: set success msg
        } else {
            dispatch(setErrorsAC(['There has been an error.']));
        }
    } else {
        dispatch(setErrorsAC([]));
    }
}

export const removeUserFromGroup = (name, usernameToRemove) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const userToRemove = await UserService.getUser(usernameToRemove);
    
    if(userToRemove?.username) {
        const response = await GroupService.removeUserFromGroup(username, name, usernameToRemove);

        if(response.status == 200 || response.status == 204) {
            dispatch(removeUserAC(usernameToRemove));
            dispatch(setErrorsAC([]));
            // todo: set success msg
        } else {
            dispatch(setErrorsAC(['There has been an error.']));
        }
    }
}