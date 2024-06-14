import FileService from '../../services/FileService';
import TagService from '../../services/TagService';
import { addNewAC, setLoadingAC, setCurrentFileAC, setFilesAC, deleteFileAC, setErrorsAC } from '../actionCreators/fileActionCreators';

export const addNewFile = (filename, file) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    // todo: edit filename

    const data = await FileService.uploadFile(username, filename, file);
    console.log(data)
    if(data?.files) {
        dispatch(addNewAC(filename));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}

export const setCurrentFile = (fileId) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const file = await FileService.getFileInfo(username, fileId);

    if(file?.displayPath) {
        dispatch(setCurrentFileAC(file));
    } else {
        dispatch(setCurrentFileAC(null));
    }
}

const setFileAccess = async (dispatch, getState, repositoryId, fileId, accessTypes) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const file = await FileService.setFileAccess(username, repositoryId, fileId, accessTypes);

    if(file?.displayPath) {
        dispatch(setCurrentFileAC(file));
        dispatch(setErrorsAC([]));
        // todo: set success msg
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}

const setFileTags = async (dispatch, getState, repositoryId, fileId, tags) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const currentFileTags = getState().fileReducer.currentFile.tags;
    const newTags = tags.filter(item => currentFileTags.indexOf(item) == -1);
    const removedTags = currentFileTags.filter(item => tags.indexOf(item) == -1);

    newTags.forEach(async item => {
        await TagService.addFileTag(username, repositoryId, fileId, item);
    });

    removedTags.forEach(async item => {
        await TagService.deleteFileTag(username, repositoryId, fileId, item);
    });
}

export const editFile = (repositoryId, fileId, accessTypes, tags) => async (dispatch, getState) => {
    await setFileTags(dispatch, getState, repositoryId, fileId, tags);
    await setFileAccess(dispatch, getState, repositoryId, fileId, accessTypes);
}

export const loadLatestFiles = (page = 1, size = 10, sort='displayFilename,asc') => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const files = await FileService.searchFiles('', username, page, size, '', sort);

    if(files?.content) {
        dispatch(setFilesAC(files));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setFilesAC({content: [], page: 1, size: size, totalSize: size}));
    }
}

export const loadRepositoryFiles = (repositoryId, page = 1, size = 10, sort='displayFilename,asc') => async (dispatch) => {
    // todo: edit this function
    
    dispatch(setLoadingAC());

    let files = {
        content: [
            {
                "displayPath": "/dir1/dir2",
                "displayFilename": "file2.txt",
                "displayFilename": "/dir1/dir2/file.txt",
                "tags": ["tag1", "tag2"]
            },
            {
                "displayPath": "/dir1/dir2",
                "displayFilename": "file.txt",
                "displayFilename": "/dir1/dir2/file.txt",
                "tags": ["tag1", "tag2"]
            },
        ],
        "page": page,
        "size": 10,
        "sort": "displayFilename,acs",
        "totalSize": 15
    };

    // imitate loading
    setTimeout(() => {
        dispatch(setFilesAC(files));
    }, 500)
}


export const searchFiles = (searchParam, page = 1, size = 10, tags='', sort='displayFilename,asc') => async (dispatch, getState) => {
    dispatch(setLoadingAC());

    const username = getState().authReducer.user.username;
    const files = await FileService.searchFiles(searchParam, username, page, size, tags, sort);

    if(files?.content) {
        dispatch(setFilesAC(files));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setFilesAC({content: [], page: 1, size: size, totalSize: size}));
    }
}

export const deleteFile = (fileId, filename) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const response = await FileService.deleteFile(username, fileId, filename);

    if(response.status == 200) {
        dispatch(deleteFileAC(filename));
        dispatch(setErrorsAC([]));
        // todo: set success msg
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}
