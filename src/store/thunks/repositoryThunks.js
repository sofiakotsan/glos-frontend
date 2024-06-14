import RepositoryService from '../../services/RepositoryService';
import TagService from '../../services/TagService';
import { addNewAC, setLoadingAC, setCurrentRepositoryAC, setTokenAC, setTokenLoadingAC, setRepositoriesAC, deleteRepositoryAC, setErrorsAC } from '../actionCreators/repositoryActionCreators';

export const addNewRepository = (repository) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;

    const data = await RepositoryService.createRepository(username, repository);
    if(data?.displayName) {
        dispatch(addNewAC(data));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}

export const setCurrentRepository = (repositoryId) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const repository = await RepositoryService.getRepository(username, repositoryId);

    if(repository?.displayName) {
        dispatch(setCurrentRepositoryAC(repository));
    } else {
        dispatch(setCurrentRepositoryAC(null));
    }
}

export const setRepositoryAccess = async (dispatch, getState, repositoryId, tags) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const currentRepTags = getState().repositoryReducer.currentRepository.access_types;
    const newTags = tags.filter(item => currentRepTags.indexOf(item) == -1);
    const removedTags = currentRepTags.filter(item => tags.indexOf(item) == -1);

    newTags.forEach(async item => {
        const parsedValues = item.split("_");
        await RepositoryService.addRepositoryAccessForGroup(repositoryId, parsedValues[0], parsedValues[2]);
    });

    removedTags.forEach(async item => {
        const parsedValues = item.split("_");
        await RepositoryService.removeRepositoryAccessForGroup(repositoryId, parsedValues[0], parsedValues[2]);
    });

    dispatch(setCurrentRepositoryAC({
        ...getState().repositoryReducer.currentRepository,
        access_types: tags
    }));
    dispatch(setErrorsAC([]));
}

const setRepositoryTags = async (dispatch, getState, repositoryId, tags) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const currentRepTags = getState().repositoryReducer.currentRepository.tags;
    const newTags = tags.filter(item => currentRepTags.indexOf(item) == -1);
    const removedTags = currentRepTags.filter(item => tags.indexOf(item) == -1);

    newTags.forEach(async item => {
        await TagService.addRepositoryTag(username, repositoryId, item);
    });

    removedTags.forEach(async item => {
        await TagService.deleteRepositoryTag(username, repositoryId, item);
    });
}

export const editRepository = (repositoryId, accessTypes, tags) => async (dispatch, getState) => {
    await setRepositoryTags(dispatch, getState, repositoryId, tags);
    await setRepositoryAccess(dispatch, getState, repositoryId, accessTypes);
}

export const getRepositoryToken = (repositoryId) => async (dispatch) => {
    dispatch(setTokenLoadingAC());
    const token = await RepositoryService.getRepositorySharedToken(repositoryId);

    if(token) {
        dispatch(setTokenAC(token));
    }
}

export const loadLatestRepositories = (page = 1, size = 10, sort='displayFullName,asc') => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const repositories = await RepositoryService.searchRepositories('', username, page, size, '', sort);

    if(repositories?.content) {
        dispatch(setRepositoriesAC(repositories));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setRepositoriesAC({content: [], page: 1, size: size, totalSize: size}));
    }
}

export const searchRepositories = (searchParam, page = 1, size = 10, tags='', sort='displayFullName,asc') => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const username = getState().authReducer.user.username;
    const repositories = await RepositoryService.searchRepositories(searchParam, username, page, size, tags, sort);

    if(repositories?.content) {
        dispatch(setRepositoriesAC(repositories));
        dispatch(setErrorsAC([]));
    } else {
        dispatch(setRepositoriesAC({content: [], page: 1, size: size, totalSize: size}));
    }
}

export const deleteRepository = (repositoryId) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    
    const username = getState().authReducer.user.username;
    const response = await RepositoryService.deleteRepository(username, repositoryId);

    if(response.status == 200) {
        dispatch(deleteRepositoryAC(repositoryId));
        dispatch(setErrorsAC([]));
        // todo: set success msg
    } else {
        dispatch(setErrorsAC(['There has been an error.']));
    }
}