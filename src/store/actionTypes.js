export const appActionTypes = {
    SET_INITIALIZED: 'SET_INITIALIZED',
}

export const authActionTypes = {
    SET_LOADING: 'SET_LOADING_AUTH',
    SET_USER: 'SET_USER',
    SET_ERROR: 'SET_ERROR',
    LOG_OUT: 'LOG_OUT',
    REGISTER: 'REGISTER',
    UPDATE_USER: 'UPDATE_USER',
    SET_UPDATE_STATUS: 'SET_UPDATE_STATUS',
}

export const repositoryActionTypes = {
    ADD_NEW: 'ADD_NEW_REPOSITORY',
    SET_LOADING: 'SET_LOADING_REPOSITORY',
    SET_CURRENT_REPOSITORY: 'SET_CURRENT_REPOSITORY',
    SET_TOKEN_LOADING: 'SET_TOKEN_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    SET_REPOSITORIES: 'SET_REPOSITORIES',
    SET_ERRORS: 'SET_ERRORS_REPOSITORY',
    DELETE: 'DELETE_REPOSITORY',
}

export const fileActionTypes = {
    ADD_NEW: 'ADD_NEW_FILE',
    SET_LOADING: 'SET_LOADING_FILE',
    SET_CURRENT_FILE: 'SET_CURRENT_FILE',
    SET_FILES: 'SET_FILES',
    SET_ERRORS: 'SET_ERRORS_FILE',
    DELETE: 'DELETE_FILE',
}

export const groupActionTypes = {
    ADD_NEW: 'ADD_NEW_GROUP',
    SET_LOADING: 'SET_LOADING_GROUP',
    SET_CURRENT_GROUP: 'SET_CURRENT_GROUP',
    DELETE: 'DELETE_GROUP',
    SET_GROUPS: 'SET_GROUPS',
    ADD_USER: 'ADD_USER',
    REMOVE_USER: 'REMOVE_USER',
    SET_ERRORS: 'SET_ERRORS_GROUP',
}

export const commentActionTypes = {
    SET_CURRENT_COMMENT: 'SET_CURRENT_COMMENT',
    SET_COMMENTS: 'SET_COMMENTS',
    SET_LOADING: 'SET_LOADING_COMMENTS',
    SET_ERRORS: 'SET_ERRORS_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
}