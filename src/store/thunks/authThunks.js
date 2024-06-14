import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { logoutAC, setErrorAC, setLoadingAC, setUserAC, updateUserAC } from '../actionCreators/authActionCreators';


export const login = (login, password) => async (dispatch) => {
    dispatch(setLoadingAC());
    const data = await AuthService.login(login, password);

    console.log(data)
    if (data?.accessToken) {
        // set token and refresh token to local storage
        localStorage.setItem("glosAccessToken", data.accessToken);
        localStorage.setItem("glosRefreshToken", data.refreshToken);

        const user = await UserService.getUser(login);
        // const userImage = await UserService.getUserImage(user.username); // todo: remove endpoint
        const userImage = { tempUrl: "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1" };
        console.log(user)
        
        dispatch(setUserAC(user, userImage.tempUrl, data.accessToken));
        setErrorAC([]);
    } else {
        dispatch(setErrorAC(['Invalid username or password.']));
    }
}

export const register = (newUser) => async (dispatch) => {
    dispatch(setLoadingAC());
    const data = await AuthService.register(newUser);

    console.log(data)
    if (data?.accessToken) {
        // set token and refresh token to local storage
        localStorage.setItem("glosAccessToken", data.accessToken);
        localStorage.setItem("glosRefreshToken", data.refreshToken);

        const user = await UserService.getUser(newUser.username);
        // const userImage = await UserService.getUserImage(user.username); // todo: remove endpoint
        const userImage = { tempUrl: "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1" };
        console.log(user)
        
        dispatch(setUserAC(user, userImage.tempUrl, data.accessToken));
        setErrorAC([]);
    } else {
        dispatch(setErrorAC(['There was an error.']));
    }
}

export const logout = () => async (dispatch) => {
    dispatch(setLoadingAC());
    const response = await AuthService.logout();
    localStorage.removeItem('glosAccessToken');
    localStorage.removeItem('glosRefreshToken');
    dispatch(logoutAC());
}

export const changeEmail = (oldEmail, newEmail) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const user = getState().authReducer.user;
    const username = user.username;
    const response = await AuthService.changeEmail(username, oldEmail, newEmail);

    if(response.status == 200 || response.status == 204) {
        // dispatch(updateUserAC({...user, email: newEmail}))
        dispatch(setErrorAC([]));
    } else {
        dispatch(setErrorAC(['There has been an error.']));
    }
}

export const changePhoneNumber = (oldNumber, newNumber) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const user = getState().authReducer.user;
    const username = user.username;
    const response = await AuthService.changePhoneNumber(username, oldNumber, newNumber);

    if(response.status == 200) {
        // dispatch(updateUserAC({...user, phoneNumber: newNumber}))
        dispatch(setErrorAC([]));
    } else {
        dispatch(setErrorAC(['There has been an error.']));
    }
}

export const changePassword = (password, confirmPassword) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const user = getState().authReducer.user;
    const username = user.username;
    const response = await AuthService.changePassword(username, password, confirmPassword);

    if(response.status == 200) {
        // dispatch(updateUserAC({...user}))
        dispatch(setErrorAC([]));
    } else {
        dispatch(setErrorAC(['There has been an error.']));
    }
}

export const executeOperation = (code) => async (dispatch, getState) => {
    dispatch(setLoadingAC());
    const user = getState().authReducer.user;
    const username = user.username;
    const response = await AuthService.executeOperation(code);

    if(response.status == 200) {
        const user = await UserService.getUser(username);
        dispatch(updateUserAC(user))
        dispatch(setErrorAC([]));
    } else {
        dispatch(setErrorAC(['There has been an error.']));
    }
}

// export const updateUser = (user) => async (dispatch, getState) => {
//     dispatch(setLoadingAC());

//     const username = getState().authReducer.user.username;
//     const result = await UserService.updateUser(username, user);

//     if (result.status == 200) {
//         const newUser = await UserService.getUser(username);
//         dispatch(updateUserAC(newUser));
//         dispatch(setErrorAC([]));
//     } else {
//         dispatch(setErrorAC(['There has been an error.']));
//     }
// }